# test.py

import os
import time
import torch
import torch.nn as nn
from torch.utils.data import DataLoader
from MWFormer.val_data_functions import ValData
from MWFormer.utils_val import validation_stylevec, validation_stylevec2, validation_stylevec3 
import numpy as np
import random
from MWFormer.model.EncDec import Network_top    #default
from MWFormer.model.style_filter64 import StyleFilter_Top
import sys

# Thêm thư mục MWFormer vào sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'MWFormer')))

# def get_parser_denoise(**parser_kwargs):
#     parser = argparse.ArgumentParser(**parser_kwargs)
#     parser = argparse.ArgumentParser(description='Hyper-parameters for network')
#     parser.add_argument('-val_batch_size', help='Set the validation/test batch size', default=1, type=int)
#     parser.add_argument('-seed', help='set random seed', default=19, type=int)
#     parser.add_argument("-restore-from-stylefilter", help='the weights of feature extraction network', type=str, default='/home/duongnhan/Chon/MWFormer/ckpt/lan4/finetune/finetune3/style_best_all')
#     parser.add_argument('-restore-from-backbone', help='the weights of the image restoration backbone', default='/home/duongnhan/Chon/MWFormer/ckpt/lan4/finetune/finetune3/finetune4_3190000.pth', type=str)     
#     parser.add_argument('-val_data_dir', default='/home/duongnhan/Chon/Capstone_project/Backend/MWFormer/data/bew/', type=str)  # Chỉ đường dẫn đến thư mục upload ảnh
#     parser.add_argument('-val_filename', default='CT.txt', type=str)  # Sử dụng tên file của ảnh vừa tải lên

#     args = parser.parse_args()
#     return args


def run_denoise(
    val_batch_size=1,
    seed=19,
    restore_from_stylefilter='/home/duongnhan/Chon/MWFormer/ckpt/lan4/finetune/finetune3/style_best_all',
    restore_from_backbone='/home/duongnhan/Chon/MWFormer/ckpt/lan4/finetune/finetune3/finetune4_3190000.pth',
    val_data_dir='/home/duongnhan/Chon/Capstone_project/Backend/MWFormer/data/bew/',
    val_filename='CT.txt',
):
    # Set seed
    if seed is not None:
        np.random.seed(seed)
        torch.manual_seed(seed)
        torch.cuda.manual_seed(seed)
        random.seed(seed) 
        print('Seed:\t{}'.format(seed))

    device_ids = [Id for Id in range(torch.cuda.device_count())]
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)

    val_data_loader = DataLoader(
        ValData(val_data_dir, val_filename),
        batch_size=val_batch_size,
        shuffle=False,
        num_workers=8
    )

    net = Network_top().to(device)
    net = nn.DataParallel(net, device_ids=device_ids)

    weights_dict = torch.load(restore_from_backbone)
    net.load_state_dict(weights_dict)
    net.eval()

    StyleFilter = StyleFilter_Top().to(device)
    StyleFilter = nn.DataParallel(StyleFilter, device_ids=device_ids)

    restore = torch.load(restore_from_stylefilter, map_location=lambda storage, loc: storage).module.state_dict()
    weights_dict = {}
    for k, v in restore.items():
        new_k = 'module.' + k
        weights_dict[new_k] = v

    StyleFilter.load_state_dict(weights_dict)
    for param in StyleFilter.parameters():
        param.requires_grad = False
    StyleFilter.eval()

    with torch.no_grad():
        pred_image = validation_stylevec3(StyleFilter, net, val_data_loader, device)

    return pred_image


def run_denoise_info(
    val_batch_size=1,
    seed=19,
    restore_from_stylefilter='/home/duongnhan/Chon/MWFormer/ckpt/lan4/finetune/finetune3/style_best_all',
    restore_from_backbone='/home/duongnhan/Chon/MWFormer/ckpt/lan4/finetune/finetune3/finetune4_3190000.pth',
    val_data_dir='/home/duongnhan/Chon/Capstone_project/Backend/MWFormer/data/bew/',
    val_filename='CT.txt',
):
    # Set seed
    if seed is not None:
        np.random.seed(seed)
        torch.manual_seed(seed)
        torch.cuda.manual_seed(seed)
        random.seed(seed) 
        print('Seed:\t{}'.format(seed))

    device_ids = [Id for Id in range(torch.cuda.device_count())]
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)

    val_data_loader = DataLoader(
        ValData(val_data_dir, val_filename),
        batch_size=val_batch_size,
        shuffle=False,
        num_workers=8
    )

    net = Network_top().to(device)
    net = nn.DataParallel(net, device_ids=device_ids)

    weights_dict = torch.load(restore_from_backbone)
    net.load_state_dict(weights_dict)
    net.eval()

    StyleFilter = StyleFilter_Top().to(device)
    StyleFilter = nn.DataParallel(StyleFilter, device_ids=device_ids)

    restore = torch.load(restore_from_stylefilter, map_location=lambda storage, loc: storage).module.state_dict()
    weights_dict = {}
    for k, v in restore.items():
        new_k = 'module.' + k
        weights_dict[new_k] = v

    StyleFilter.load_state_dict(weights_dict)
    for param in StyleFilter.parameters():
        param.requires_grad = False
    StyleFilter.eval()

    with torch.no_grad():
        val_psnr, val_ssim = validation_stylevec(StyleFilter, net, val_data_loader, device)

    return val_psnr, val_ssim
