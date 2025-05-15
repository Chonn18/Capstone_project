#!/usr/bin/env python
# -*- coding:utf-8 -*-

import warnings
warnings.filterwarnings("ignore")
import os
import sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'InvSR')))

import numpy as np
from pathlib import Path
from omegaconf import OmegaConf
from InvSR.sampler_invsr import InvSamplerSR

from InvSR.utils import util_common
from InvSR.utils.util_opts import str2bool
from InvSR.basicsr.utils.download_util import load_file_from_url

# def get_parser_InvSR(**parser_kwargs):
#     parser = argparse.ArgumentParser(**parser_kwargs)
#     parser.add_argument("-i", "--in_path", type=str, default="", help="Input path")
#     parser.add_argument("-o", "--out_path", type=str, default="", help="Output path")
#     parser.add_argument("--bs", type=int, default=1, help="Batchsize for loading image")
#     parser.add_argument("--chopping_bs", type=int, default=2, help="Batchsize for chopped patch")
#     parser.add_argument("-t", "--timesteps", type=int, nargs="+", help="The inversed timesteps")
#     parser.add_argument("-n", "--num_steps", type=int, default=1, help="Number of inference steps")
#     parser.add_argument(
#         "--cfg_path", type=str, default="./InvSR/configs/sample-sd-turbo.yaml", help="Configuration path.",
#     )
#     parser.add_argument(
#         "--sd_path", type=str, default="", help="Path for Stable Diffusion Model",
#     )
#     parser.add_argument(
#         "--started_ckpt_path", type=str, default="", help="Checkpoint path for noise predictor"
#     )
#     parser.add_argument(
#         "--tiled_vae", type=str2bool, default='true', help="Enabled tiled VAE.",
#     )
#     parser.add_argument(
#         "--color_fix", type=str, default='', choices=['wavelet', 'ycbcr'], help="Fix the color shift",
#     )
#     parser.add_argument(
#         "--chopping_size", type=int, default=128, help="Chopping size when dealing large images"
#     )
#     args = parser.parse_args()

#     return args

cfg_path="./InvSR/configs/sample-sd-turbo.yaml"

def get_configs(
    timesteps=None,
    num_steps=1,
    started_step=None,
    sd_path="",
    started_ckpt_path="",
    bs=1,
    tiled_vae=True,
    color_fix='',
    chopping_size=128,
    chopping_bs=2,
):
    configs = OmegaConf.load(cfg_path)

    if timesteps is not None:
        assert len(timesteps) == num_steps
        configs.timesteps = sorted(timesteps, reverse=True)
    else:
        if num_steps == 1:
            configs.timesteps = [200,]
        elif num_steps == 2:
            configs.timesteps = [200, 100]
        elif num_steps == 3:
            configs.timesteps = [200, 100, 50]
        elif num_steps == 4:
            configs.timesteps = [200, 150, 100, 50]
        elif num_steps == 5:
            configs.timesteps = [250, 200, 150, 100, 50]
        else:
            assert num_steps <= 250
            # nếu started_step chưa định nghĩa thì mặc định 200 hoặc 250
            if started_step is None:
                started_step = 200
            configs.timesteps = np.linspace(
                start=started_step, stop=0, num=num_steps, endpoint=False, dtype=np.int64
            ).tolist()
    print(f'Setting timesteps for inference: {configs.timesteps}')

    sd_path = sd_path if sd_path else "./InvSR/weights"
    util_common.mkdir(sd_path, delete=False, parents=True)
    configs.sd_pipe.params.cache_dir = sd_path

    if started_ckpt_path:
        ckpt_path = started_ckpt_path
    else:
        started_ckpt_name = "noise_predictor_sd_turbo_v5.pth"
        started_ckpt_dir = "./InvSR/weights"
        util_common.mkdir(started_ckpt_dir, delete=False, parents=True)
        ckpt_path = Path(started_ckpt_dir) / started_ckpt_name
        if not ckpt_path.exists():
            load_file_from_url(
                url="https://huggingface.co/OAOA/InvSR/resolve/main/noise_predictor_sd_turbo_v5.pth",
                model_dir=started_ckpt_dir,
                progress=True,
                file_name=started_ckpt_name,
            )
    configs.model_start.ckpt_path = str(ckpt_path)

    configs.bs = bs
    configs.tiled_vae = tiled_vae
    configs.color_fix = color_fix
    configs.basesr.chopping.pch_size = chopping_size
    if bs > 1:
        configs.basesr.chopping.extra_bs = 1
    else:
        configs.basesr.chopping.extra_bs = chopping_bs

    return configs


def runSR(
    input_path,
    output_path,
    bs=1,
    chopping_bs=2,
    timesteps=None,
    num_steps=1,
    sd_path="",
    started_ckpt_path="",
    tiled_vae=True,
    color_fix='',
    chopping_size=128,
    started_step=None,
):
    # Tạo cấu hình từ các tham số
    configs = get_configs(
        timesteps=timesteps,
        num_steps=num_steps,
        started_step=started_step,
        sd_path=sd_path,
        started_ckpt_path=started_ckpt_path,
        bs=bs,
        tiled_vae=tiled_vae,
        color_fix=color_fix,
        chopping_size=chopping_size,
        chopping_bs=chopping_bs,
    )

    sampler = InvSamplerSR(configs)

    sampler.inference(input_path, out_path=output_path, bs=bs)


def runSR_Folder(input_folder, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for filename in os.listdir(input_folder):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            input_path = os.path.join(input_folder, filename)
            output_path = os.path.join(output_folder, filename)
            print(f"Đang xử lý: {input_path}")
            runSR(input_path, output_path)


# Ví dụ chạy trực tiếp
# runSR('/home/duongnhan/Chon/MWFormer/results/pred7.png', './uploads')
