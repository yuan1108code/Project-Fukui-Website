import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import os
import json

# 處理城市數據並輸出 JSON
file_paths = [
    "./../dataset-sorting/fukui-google-trend/google_trends/福井市_jp.csv",
    "./../dataset-sorting/fukui-google-trend/google_trends/坂井市_jp.csv",
    # 其他文件路徑...
]
city_names = ["福井市", "坂井市", ...]

result = {}
for file_path, city_name in zip(file_paths, city_names):
    data = pd.read_csv(file_path)
    data['date'] = pd.to_datetime(data['date'])
    monthly_sum = data.groupby(data['date'].dt.to_period('M')).sum(numeric_only=True).sum(axis=1)
    monthly_sum.index = monthly_sum.index.strftime('%Y-%m')
    df = pd.DataFrame({'month': monthly_sum.index, 'count': monthly_sum.values})
    df['anomaly'] = IsolationForest(contamination=0.1, random_state=42).fit_predict(df[['count']])
    result[city_name] = df.to_dict(orient='list')

# 輸出 JSON
os.makedirs('./data', exist_ok=True)
with open('./data/city_traffic.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
