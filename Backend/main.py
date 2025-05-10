from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io

app = FastAPI()

# Allow frontend (e.g., http://localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or specific origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/process-image/")
async def process_image(file: UploadFile = File(...)):
    image = Image.open(io.BytesIO(await file.read()))
    # 🧪 Example: Convert to grayscale
    image = image.convert("L")

    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)

    # return StreamingResponse(img_byte_arr, media_type="image/png")
