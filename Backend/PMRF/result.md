train log:
wandb: Run history:
wandb: epoch ▁▁▁▁▂▂▂▂▂▃▃▃▃▃▃▄▄▄▄▄▅▅▅▅▅▅▆▆▆▆▆▇▇▇▇▇▇███
wandb: lr-AdamW ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
wandb: train/loss ▂▃▁▁▃▃▁▁▁▁▁▃▁▁▁▂▃█▁▁▁▁▃▁▁▁▁▁▁▁▁▁▁▁▁▁▂▂▁▁
wandb: trainer/global_step ▁▁▁▂▂▂▂▂▂▃▃▃▃▃▄▄▄▄▄▄▅▅▅▅▅▅▆▆▆▆▆▇▇▇▇▇▇███
wandb: val_metrics/fid █▆▄▄▆▃▄▂▂▄▅▃▄▃▂▄▅▃▁▂▄▂▂▃▂▁▂▃▃▄▆▃▃▃▂▁▂▂▃▃
wandb: val_metrics/inception_score_mean ▄█▆▆▄▅▅▃▂▄▅▃▇▃▂▆▆▃▃▃▇▃▃▃▁▁▃▂▁▅▄▄▂▃▁▃▁▃▂▁
wandb: val_metrics/inception_score_std ▅▆▇▂▆▅▅▅▄▆▄▃█▅▅▄▅▅▄▅▃▆▅▃▃▅▅▃▆▆▄▄▃▅▅▃▄▁▄▂
wandb: val_metrics/mse █▄▂▂▃▁▂▂▁▂▃▁▃▁▁▂▂▁▁▁▂▁▁▁▁▁▁▁▁▂▂▂▁▁▁▁▁▁▂▁
wandb:
wandb: Run summary:
wandb: epoch 999
wandb: lr-AdamW 0.0005
wandb: train/loss 0.0051
wandb: trainer/global_step 136999
wandb: val_metrics/fid 102.0
wandb: val_metrics/inception_score_mean 1.92188
wandb: val_metrics/inception_score_std 0.1748
wandb: val_metrics/mse 0.00108
wandb:
wandb: You can sync this run to the cloud by running:
wandb: wandb sync ./wandb/offline-run-20250316_141132-b0t01wss
wandb: Find logs at: ./wandb/offline-run-20250316_141132-b0t01wss/logs
wandb: WARNING The new W&B backend becomes opt-out in version 0.18.0; try it out with `wandb.require("core")`! See https://wandb.me/wandb-core for more information.

MSE 2000, flow 100 epochs model hdit_XL
{'psnr': 21.91895866394043, 'mse': 427.63519287109375, 'lpips': 0.34125301241874695,
'ssim': 0.7228084206581116, 'inception_score_mean': 2.1589616909042464, 'inception_score_std': 0.29992456637106074,
'frechet_inception_distance': 225.5193841862891, 'kernel_inception_distance_mean': 0.12168179272536041,
'kernel_inception_distance_std': 2.3218387448067024e-07, 'precision': 0.4057970941066742, 'recall': 0.014492753893136978,
'f_score': 0.02798600748234498}

{'psnr': 21.970745086669922, 'mse': 422.5792236328125, 'lpips': 0.39818063378334045, 'ssim': 0.5201612114906311, 'inception_score_mean': 2.1589616909042464, 'inception_score_std': 0.29992456637106074, 'frechet_inception_distance': 232.9105101107757, 'kernel_inception_distance_mean': 0.1299038973611904, 'kernel_inception_distance_std': 2.1845082281030795e-07, 'precision': 0.3333333432674408, 'recall': 0.028985507786273956, 'f_score': 0.0533333343744278}

{'psnr': 22.02616310119629, 'mse': 417.7317810058594, 'lpips': 0.3143099844455719, 'ssim': 0.7378052473068237, 'inception_score_mean': 2.1589616909042464, 'inception_score_std': 0.29992456637106074, 'frechet_inception_distance': 239.36042528256303, 'kernel_inception_distance_mean': 0.13647443478415314, 'kernel_inception_distance_std': 1.7844065692000446e-07, 'precision': 0.3188405930995941, 'recall': 0.043478261679410934, 'f_score': 0.07652174077033996}

MSE 2000, flow 1000 epochs model hdit_custom
{'psnr': 22.388511657714844, 'mse': 384.7012939453125, 'lpips': 0.3057408034801483, 'ssim': 0.7518835067749023, 'inception_score_mean': 2.1589616909042464, 'inception_score_std': 0.29992456637106074, 'frechet_inception_distance': 235.04049421677084, 'kernel_inception_distance_mean': 0.1359404263875278, 'kernel_inception_distance_std': 1.9792749718561493e-07, 'precision': 0.260869562625885, 'recall': 0.028985507786273956, 'f_score': 0.05217391386628151}
