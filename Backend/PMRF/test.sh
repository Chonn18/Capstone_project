#!/bin/bash


for method in "mmse" "naive_flow" "pmrf" "posterior_conditioned_on_mmse" "posterior_conditioned_on_y"; do
python test.py \
--precision "32" \
--degradation "gaussian_noise_035" \
--test_data_root "/home/duongnhan/Chon/Capstone_project/Backend/PMRF/datasets/test/GT" \
--num_gpus 1 \
--batch_size 4 \
--num_workers 12 \
--img_size 512 \
--ckpt_path "/home/duongnhan/Chon/Capstone_project/Backend/PMRF/PMRF/pmrf_100_epochs/kaggle/working/PMRF-main/PMRF263/bod8opkn/checkpoints/last.ckpt" \
--results_path "./out/test4" \
--num_flow_steps 50
#--num_flow_steps 5 10 20 50 100

done
