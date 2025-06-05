import shutil
import os
import torch
from rundenoise import run_denoise, get_parser_denoise, run_denoise_info
import argparse



# Đường dẫn để lưu file ảnh tạm thời
UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

args = get_parser_denoise()

# Chạy hàm test.py
try:
    psnr, ssim = run_denoise_info(args)  # Gọi hàm test với các tham số đã định nghĩa
    print('val_psnr thu: {0:.2f}, val_ssim thu: {1:.4f}'.format(psnr, ssim))
    # return {"message": "Image denoising completed successfully"}
except Exception as e:
    # return {"error": str(e)}
    print("Eror:", str(e))




