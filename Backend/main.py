from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import shutil
import os
import torch
from rundenoise import run_denoise, run_denoise_multi
from runSR import runSR
import argparse
from PIL import Image
import io
import base64
import uuid


def save_iamge(image, ten_file=None):
    # Tạo thư mục nếu chưa có
    os.makedirs('./uploads/run/input', exist_ok=True)
    os.makedirs('./uploads/run/gt', exist_ok=True)

    # Tạo tên file nếu không có (dựa trên thời gian)
    if ten_file is None:
        # ten_file = datetime.now().strftime("image_%Y%m%d_%H%M%S.png")
        ten_file = "anhtest.png"
    path_in = "./uploads/run/input"
    # Đường dẫn lưu ảnh
    duong_dan_input = os.path.join('./uploads/run/input', ten_file)
    duong_dan_gt = os.path.join('./uploads/run/gt', ten_file)

    # Lưu ảnh vào cả 2 thư mục
    image.save(duong_dan_input)
    image.save(duong_dan_gt)

    # Ghi đường dẫn vào file ten.txt
    with open('./uploads/run/ten.txt', 'a', encoding='utf-8') as f:
        f.write(f"/input/{ten_file}\n")

    # return 

# Khởi tạo ứng dụng FastAPI
app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Gắn static frontend đã build
app.mount("/", StaticFiles(directory="frontend_dist", html=True), name="static")

# Trả index.html nếu truy cập '/'
@app.get("/")
def serve_root():
    return FileResponse("frontend_dist/index.html")


# @app.get("/")
# def read_root():
#     return {"Hello": "World"}

@app.post("/testSend/")
async def testSend(
    file: UploadFile = File(...),
    filename: str = Form(...)
):
    try:
        # Mở và lưu ảnh với tên đã nhận
        image = Image.open(file.file)
        image_result = image
        # Đọc kết quả ảnh đã xử lý
        # result_path = os.path.join("./results/denoise", filename)
        # image_result = Image.open(result_path)

        # Chuyển ảnh sang base64
        buffered = io.BytesIO()
        image_result.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "message": "Image denoising completed successfully",
            "image_base64": img_str,
            # "psnr": psnr,
            # "ssim": ssim
        }
    except Exception as e:
        return {"error": str(e)}

# Định nghĩa một POST endpoint cho việc xử lý ảnh
@app.post("/denoise-image/")
async def denoise_image(
    file: UploadFile = File(...),
    filename: str = Form(...)
):
    try:
        # Mở và lưu ảnh với tên đã nhận
        session_id = str(uuid.uuid4())
        up_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/up/{session_id}/'
        save_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/result/{session_id}/'
        os.makedirs(os.path.join(up_dir, 'input'), exist_ok=True)
        os.makedirs(os.path.join(up_dir, 'gt'), exist_ok=True)
        # Mở và lưu ảnh với tên đã nhận
        image = Image.open(file.file)

        image_input_path = os.path.join(up_dir,"input", filename)
        image_gt_path = os.path.join(up_dir,"gt", filename)
        image.save(image_input_path)
        image.save(image_gt_path)

        # Ghi tên file vào ten.txt
        with open(os.path.join(up_dir, "CT.txt"), "w", encoding="utf-8") as f:
            f.write(f"/input/{filename}\n")
        textfile = '/CT.txt'
        pred_image = run_denoise(val_data_dir=up_dir, val_filename=textfile)
        # image_result = pred_image
        # Đọc kết quả ảnh đã xử lý
        # result_path = os.path.join("./results/denoise", filename)
        image_result = Image.open(pred_image)

        # Chuyển ảnh sang base64
        buffered = io.BytesIO()
        image_result.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "message": "Image denoising completed successfully",
            "image_base64": img_str,
            # "psnr": psnr,
            # "ssim": ssim
        }

    except Exception as e:
        return {"error": str(e)}

@app.post("/denoise-image-multi/")
async def denoise_image(
    file: UploadFile = File(...),
    filename: str = Form(...)
):
    try:
        session_id = str(uuid.uuid4())
        up_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/up/{session_id}/'
        save_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/result/{session_id}/'
        os.makedirs(os.path.join(up_dir, 'input'), exist_ok=True)
        os.makedirs(os.path.join(up_dir, 'gt'), exist_ok=True)
        # Mở và lưu ảnh với tên đã nhận
        image = Image.open(file.file)

        image_input_path = os.path.join(up_dir,"input", filename)
        image_gt_path = os.path.join(up_dir,"gt", filename)
        image.save(image_input_path)
        image.save(image_gt_path)

        # Ghi tên file vào ten.txt
        with open(os.path.join(up_dir, "CT.txt"), "w", encoding="utf-8") as f:
            f.write(f"/input/{filename}\n")

        # Chạy xử lý denoise
        textfile = 'CT.txt'
        pred_image = run_denoise_multi(val_data_dir=up_dir, val_filename=textfile,save_path=save_dir, stage = 2)
        # image_result = pred_image
        # Đọc kết quả ảnh đã xử lý
        result_path = os.path.join(pred_image, 'input', filename)
        image_result = Image.open(result_path)

        # Chuyển ảnh sang base64
        buffered = io.BytesIO()
        image_result.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "message": "Image denoising completed successfully",
            "image_base64": img_str,
            # "psnr": psnr,
            # "ssim": ssim
        }

    except Exception as e:
        return {"error": str(e)}


# @app.post("/imageSR/")
# async def SRimg(
#     file: UploadFile = File(...),
#     filename: str = Form(...)
# ):
#     try:
#         # Mở và lưu ảnh với tên đã nhận
#         image = Image.open(file.file)
        

#         # return {
#         #     "message": "Image denoising completed successfully",
#         #     "image_base64": img_str,
#         # }

#     except Exception as e:
#         return {"error": str(e)}

# uvicorn main:app --host 0.0.0.0 --port 8080
# ngrok http 8080
