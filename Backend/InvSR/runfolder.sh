#!/bin/bash

INPUT_FOLDER="/home/duongnhan/Chon/Capstone_project/Backend/ModelAI/MWFormer/results"
OUTPUT_FOLDER="/home/duongnhan/Chon/Capstone_project/Backend/ModelAI/InvSR/out/test"
ERROR_LOG="error.log"

> "$ERROR_LOG"  # Xóa nội dung cũ của error.log trước khi chạy

for image in "$INPUT_FOLDER"/*.*g; do
    echo "Processing $image..."
    python inference_invsr.py -i "$image" -o "$OUTPUT_FOLDER" --num_steps 1 --bs 1 --chopping_bs 2
    if [ $? -ne 0 ]; then
        echo "Error processing $image, skipping..."
        echo "$image" >> "$ERROR_LOG"  # Ghi ảnh lỗi vào file log
        continue
    fi
done

echo "Processing completed!"
echo "Check $ERROR_LOG for errors."
