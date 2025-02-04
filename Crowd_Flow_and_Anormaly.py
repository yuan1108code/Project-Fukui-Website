import pandas as pd
from sklearn.ensemble import IsolationForest
import json
import os

# 讀取 CSV 檔案（請確認檔案路徑正確）
df = pd.read_csv("./data/Combine_CrowdTraffic_Monthly.csv")

# 篩選出「都道府県名」為 "福井県" 的資料
df = df[df["都道府県名"] == "福井県"]

# 建立月份欄位，格式為 "YYYY-MM"
df["month"] = df["年"].astype(str) + "-" + df["月"].apply(lambda x: f"{int(x):02d}")

# 依據「地域名称」與「month」分組，對「人数」進行求和
grouped = df.groupby(["地域名称", "month"])["人数"].sum().reset_index()

# 建立結果字典
result = {}

# 依據各城市（地域名称）進行處理
for city, group in grouped.groupby("地域名称"):
    # 按月份排序（假設月份格式為 YYYY-MM，可直接排序）
    group = group.sort_values("month")
    
    # 整理成 DataFrame，並重新命名「人数」欄位為 count
    city_df = group[["month", "人数"]].rename(columns={"人数": "count"})
    
    # 若資料筆數不足2筆，IsolationForest 可能會失效，此時直接全部標記為正常 (1)
    if len(city_df) < 2:
        city_df["anomaly"] = 1
    else:
        # 利用 IsolationForest 預測異常值，contamination 設定為 0.1
        clf = IsolationForest(contamination=0.1, random_state=42)
        # 注意：fit_predict 回傳的數值，通常 -1 代表異常、1 代表正常
        city_df["anomaly"] = clf.fit_predict(city_df[["count"]])
    
    # 將該城市資料轉為字典（包含 month, count, anomaly 各欄的 list）
    result[city] = city_df.to_dict(orient="list")

# 將結果輸出為 JSON 檔案
os.makedirs('./data', exist_ok=True)
output_json_path = "./data/city_traffic.json"
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=4)

print(f"成功生成 JSON: {output_json_path}")
