import argparse
import numpy as np

ITER_SIZE = 1
NUM_WORKERS = 12
NUM_CLASSES = 3 
NUM_STEPS = 214400  #214400   
NUM_STEPS_STOP = NUM_STEPS  # early stopping  
RANDOM_SEED = 32
RESTORE_FROM = 'without_pretraining'
RESTORE_FROM_stylefilter = '/home/duongnhan/Chon/MWFormer/ckpt/exp1/EXP1-04-07-16-55_stylefilter_9999.pth' # 64 dimensions    
SAVE_PRED_EVERY = 20000
SNAPSHOT_DIR = f'./ckpt/exp1'   #save dir
TRAIN_DATA_DIR = './data/CT25/'
LABELED_NAME = 'CT.txt'


def get_arguments():

    parser = argparse.ArgumentParser()
    parser.add_argument("-num-workers", type=int, default=NUM_WORKERS)
    parser.add_argument("-num-steps", type=int, default=NUM_STEPS)
    parser.add_argument("-num-steps-stop", type=int, default=NUM_STEPS_STOP)
    parser.add_argument("-random-seed", type=int, default=RANDOM_SEED)
    parser.add_argument("-restore-from", type=str, default=RESTORE_FROM)
    parser.add_argument("-restore-from-stylefilter", type=str, default=RESTORE_FROM_stylefilter)
    parser.add_argument("-save-pred-every", type=int, default=SAVE_PRED_EVERY)  #checkpoint interval
    parser.add_argument("-snapshot-dir", type=str, default=SNAPSHOT_DIR)
    parser.add_argument("-file-name", type=str, required=True)
    parser.add_argument('-crop_size', help='Set the crop_size', default=[256, 256], nargs='+', type=int)
    parser.add_argument('-learning_rate', help='Set the learning rate', default=2e-4, type=float)       #2e-4
    parser.add_argument('-loss_save_step', default=536, type=int)
    parser.add_argument('-lambda_loss', help='Set the lambda in loss function', default=0.04, type=float)
    parser.add_argument('-train_data_dir', type=str, default=TRAIN_DATA_DIR)
    parser.add_argument('-labeled_name', type=str, default=LABELED_NAME)
    return parser.parse_args()

args = get_arguments()