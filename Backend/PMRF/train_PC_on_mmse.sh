#!/bin/bash
# --arch "hdit_XL2" \ gocgoc

python train.py \
--precision "bf16-mixed" \
--stage "flow" \
--degradation "gaussian_noise_035" \
--train_data_root "/home/duongnhan/Chon/Capstone_project/Backend/PMRF/datasets/train/GT" \
--val_data_root "/home/duongnhan/Chon/Capstone_project/Backend/PMRF/datasets/val/GT" \
--arch "hdit_Custom" \
--num_flow_steps 1 \
--num_gpus 1 \
--num_workers 24 \
--check_val_every_n_epoch 10 \
--train_batch_size 4 \
--val_batch_size 2 \
--img_size 256 \
--max_epochs 1000 \
--ema_decay 0.9999 \
--eps 0.0 \
--t_schedule "stratified_uniform" \
--weight_decay 1e-2 \
--lr 5e-4 \
--wandb_project_name "PMRF" \
--wandb_group "Posterior conditioned on the posterior mean" \
--mmse_model_arch "swinir_M" \
--mmse_model_ckpt_path "/home/duongnhan/Chon/Capstone_project/Backend/PMRF/PMRF/gmxu1n9c/checkpoints/last.ckpt" \
--conditional