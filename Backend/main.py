from fastapi import FastAPI, File, UploadFile, Form, HTTPException
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
import requests


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
app.mount("/app", StaticFiles(directory="frontend_dist", html=True), name="static")

@app.get("/")
def serve_root():
    return FileResponse("frontend_dist/index.html")



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

@app.post("/denoise-image/")
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
        image = Image.open(file.file)

        image_input_path = os.path.join(up_dir,"input", filename)
        image_gt_path = os.path.join(up_dir,"gt", filename)
        image.save(image_input_path)
        image.save(image_gt_path)

        with open(os.path.join(up_dir, "CT.txt"), "w", encoding="utf-8") as f:
            f.write(f"/input/{filename}\n")
        textfile = '/CT.txt'
        pred_image = run_denoise(val_data_dir=up_dir, val_filename=textfile, save_path = up_dir)
        image_result = Image.open(pred_image)

        buffered = io.BytesIO()
        image_result.save(buffered, format="PNG")
        img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")

        return {
            "message": "Image denoising completed successfully",
            "image_base64": img_str,
        }

    except Exception as e:
        return {"error": str(e)}


@app.post("/denoise-image-multi/")
async def denoise_image_multi(
    file: UploadFile = File(...),
    filename: str = Form(...)
):
    try:
        session_id = str(uuid.uuid4())
        up_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/up/{session_id}/'
        save_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/result/{session_id}/'
        os.makedirs(os.path.join(up_dir, 'input'), exist_ok=True)
        os.makedirs(os.path.join(up_dir, 'gt'), exist_ok=True)

        image = Image.open(file.file)

        image_input_path = os.path.join(up_dir,"input", filename)
        image_gt_path = os.path.join(up_dir,"gt", filename)
        image.save(image_input_path)
        image.save(image_gt_path)

        with open(os.path.join(up_dir, "CT.txt"), "w", encoding="utf-8") as f:
            f.write(f"/input/{filename}\n")

        textfile = 'CT.txt'
        pred_image = run_denoise_multi(val_data_dir=up_dir, val_filename=textfile,save_path=save_dir, stage = 2)

        result_path = os.path.join(pred_image, 'input', filename)
        image_result = Image.open(result_path)

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

@app.post("/denoise-image-url/")
async def denoise_image_url(url: str = Form(...)):
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()

        image = Image.open(io.BytesIO(response.content))
        ext = image.format.lower()
        if ext not in ['jpeg', 'jpg', 'png', 'webp', 'bmp', 'tiff']:
            # return {"error": "Unsupported image format"}
            raise HTTPException(status_code=415, detail="Unsupported image format")
        if image.mode != 'RGB':
            image = image.convert('RGB')

        session_id = str(uuid.uuid4())
        up_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/up/{session_id}/'
        save_dir = f'/home/duongnhan/Chon/Capstone_project/Backend/uploads/result/{session_id}/'
        os.makedirs(os.path.join(up_dir, 'input'), exist_ok=True)
        os.makedirs(os.path.join(up_dir, 'gt'), exist_ok=True)
        # os.makedirs(save_dir, exist_ok=True)
        filename = f"{uuid.uuid4().hex}.png"
        image_input_path = os.path.join(up_dir,"input", filename)
        image_gt_path = os.path.join(up_dir,"gt", filename)
        image.save(image_input_path)
        image.save(image_gt_path)

        with open(os.path.join(up_dir, "CT.txt"), "w", encoding="utf-8") as f:
            f.write(f"/input/{filename}\n")
        textfile = '/CT.txt'
        pred_image = run_denoise(val_data_dir=up_dir, val_filename=textfile, save_path = up_dir)
        
        image_result = Image.open(pred_image)

        # Ảnh gốc
        buffered_origin = io.BytesIO()
        image_origin = image
        image_origin.save(buffered_origin, format="PNG")
        img_origin_str = base64.b64encode(buffered_origin.getvalue()).decode("utf-8")

        # Ảnh đã xử lý
        buffered_result = io.BytesIO()
        image_result.save(buffered_result, format="PNG")
        img_str = base64.b64encode(buffered_result.getvalue()).decode("utf-8")


        return {
            "message": "Image denoising completed successfully",
            "image_base64": img_str,
            "image_origin": img_origin_str,
            "name_image": filename,
        }

    except Exception as e:
        return {"error": str(e)}
    