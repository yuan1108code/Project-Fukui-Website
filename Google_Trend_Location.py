import pandas as pd
import json

# 讀取 CSV 檔案
file_path = "./data/Combine_Location_Monthly.csv"  # 請確保檔案路徑正確
df = pd.read_csv(file_path)

# 替換 NaN 為 0
df = df.fillna(0)

# 建立結果字典
result = {}

# 按月份與區域分組
for (year_month, region), group in df.groupby(["year_month", "region"]):
    # 移除 'year_month' 和 'region' 欄位，僅保留景點數據
    attractions = group.drop(columns=["year_month", "region"])

    # 過濾出搜尋量大於 0 的景點
    valid_attractions = attractions.loc[:, (attractions != 0).any(axis=0)]

    # 如果該區域沒有有效景點，則跳過
    if valid_attractions.empty:
        continue

    # 計算各景點的總搜尋量，篩選出前 5 名
    top_attractions = (
        valid_attractions.sum().nlargest(5).reset_index()
    )
    top_attractions.columns = ["name", "count"]

    # 存入字典
    if not top_attractions.empty:
        if year_month not in result:
            result[year_month] = {}
        result[year_month][region] = top_attractions.to_dict(orient="records")

# 儲存為 JSON 檔案
output_json_path = "./data/city_Google_Trends.json"
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=4)

print(f"成功生成 JSON: {output_json_path}")
