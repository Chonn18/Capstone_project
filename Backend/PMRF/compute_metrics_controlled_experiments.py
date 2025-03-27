import os
import piq
import torch
from torch.utils.data import DataLoader
from torch_fidelity import calculate_metrics
from tqdm import tqdm
from torch_fidelity.datasets import ImagesPathDataset
from torch_fidelity.registry import register_dataset
from torchvision.transforms import ToTensor
from PIL import Image
import argparse

torch.set_grad_enabled(False)

# Thay đổi dataset name để phù hợp với tập ảnh CT
register_dataset('ct_dataset',
                 lambda root, download: ImagesPathDataset([os.path.join(root, 'GT', file_name) 
                                                           for file_name in os.listdir(os.path.join(root, 'GT'))]))


def load_images(image_paths):
    """ Load ảnh JPG ở dạng grayscale """
    images = []
    for path in image_paths:
        img = Image.open(path).convert("L")  # Chuyển về ảnh grayscale (L: Luminance)
        img = ToTensor()(img)  # Convert thành tensor
        images.append(img)
    return torch.stack(images)


def compute_metrics_given_folder(xhat_dir, gt_dir, parent_ct_path):
    results = {}

    # Model tính LPIPS (Perceptual Loss)
    lpips_met = piq.LPIPS(reduction='mean').cuda()

    # Đọc danh sách file ảnh và kiểm tra sự tương ứng giữa ảnh tái tạo & ground truth
    rec_files = sorted([os.path.join(xhat_dir, file) for file in os.listdir(xhat_dir)])
    gt_files = sorted([os.path.join(gt_dir, file) for file in os.listdir(gt_dir)])
    assert len(gt_files) == len(rec_files), f"Số lượng ảnh không khớp: {len(gt_files)} ground-truth vs {len(rec_files)} tái tạo"
    for i in range(len(gt_files)):
        assert os.path.basename(gt_files[i]) == os.path.basename(
            rec_files[i]), f"File không khớp: {os.path.basename(gt_files[i])} vs {os.path.basename(rec_files[i])}"

    # Load dữ liệu ảnh
    gt_ds = ImagesPathDataset(gt_files)
    xhat_ds = ImagesPathDataset(rec_files)

    # Dataloader (batch_size có thể thay đổi nếu GPU yếu)
    gt_dl = DataLoader(gt_ds, batch_size=4, shuffle=False, drop_last=False, num_workers=10)
    rec_dl = DataLoader(xhat_ds, batch_size=4, shuffle=False, drop_last=False, num_workers=10)

    # Tính toán metrics
    mse, lpips, psnr, ssim = 0, 0, 0, 0

    for gt, rec in tqdm(zip(gt_dl, rec_dl), total=len(gt_dl)):
        gt = gt.cuda().float()
        rec = rec.cuda().float()

        # Tính toán các metrics
        mse += ((gt - rec) ** 2).mean() * gt.shape[0]
        lpips += lpips_met(gt / 255., rec / 255.) * gt.shape[0]
        psnr += piq.psnr(gt / 255., rec / 255., data_range=1., reduction='sum')
        ssim += piq.ssim(gt / 255., rec / 255., data_range=1., reduction='sum')

    # Trung bình các giá trị
    mse /= len(gt_ds)
    lpips /= len(gt_ds)
    ssim /= len(gt_ds)
    psnr /= len(gt_ds)

    # Lưu kết quả
    results['psnr'] = psnr.item()
    results['mse'] = mse.item()
    results['lpips'] = lpips.item()
    results['ssim'] = ssim.item()

    # Tính toán Fidelity (FID, KID, Precision-Recall)
    fidelity_results = calculate_metrics(
        batch_size=256,  
        input1='ct_dataset',  # Đổi dataset name phù hợp
        input2=xhat_ds,
        datasets_root=parent_ct_path,
        datasets_download=False,
        cuda=True,
        isc=True,
        fid=True,
        kid=True,
        prc=True,
        verbose=True,
        kid_subset_size=min(1000, len(xhat_ds)),
        cache=True
    )

    # Kết hợp tất cả metrics
    results = {**results, **fidelity_results}

    return results


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('--parent_ct_path', type=str, required=True,
                        help='Đường dẫn thư mục chứa ảnh gốc CT (để tính FID, KID, Precision). '
                             'Tên thư mục ảnh gốc phải là `CT_DATASET`, và bạn cung cấp đường dẫn parent.')
    parser.add_argument('--rec_path', type=str, required=True,
                        help='Đường dẫn thư mục chứa ảnh đã tái tạo từ mô hình.')
    parser.add_argument('--gt_path', type=str, required=True,
                        help='Đường dẫn thư mục chứa ảnh ground-truth gốc.')

    args = parser.parse_args()

    # Gọi hàm tính toán
    results = compute_metrics_given_folder(args.rec_path, args.gt_path, args.parent_ct_path)

    # In kết quả
    print(results)
