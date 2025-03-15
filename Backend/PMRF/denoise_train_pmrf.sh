#!/bin/bash

python train.py \
--precision "bf16-mixed" \
--stage "flow" \
--degradation "gaussian_noise_035" \
--train_data_root "/home/duongnhan/Chon/PMRF/datasets/train/GT" \
--val_data_root "/home/duongnhan/Chon/PMRF/datasets/val/GT" \
--arch "hdit_XL2" \
--num_flow_steps 2 \
--num_gpus 1 \
--num_workers 12 \
--check_val_every_n_epoch 10 \
--train_batch_size 4 \
--val_batch_size 2 \
--img_size 256 \
--max_epochs 200 \
--ema_decay 0.9999 \
--eps 0.0 \
--t_schedule "stratified_uniform" \
--weight_decay 1e-2 \
--lr 5e-4 \
--wandb_project_name "PMRF" \
--wandb_group "PMRF" \
--mmse_model_arch "swinir_M" \
--source_noise_std 0.025
