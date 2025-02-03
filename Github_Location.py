import pandas as pd
import json

# 讀取 CSV 檔案（請根據實際路徑調整）
file_path = "./data/Combine_GitHub_Location_Monthly.csv"
df = pd.read_csv(file_path)

# 將 NaN 值替換為 0
df = df.fillna(0)

# 建立結果字典
result = {}

# 按照 year_month 與 region 進行分組
for (year_month, region), group in df.groupby(["year_month", "region"]):
    # 移除 year_month 與 region 欄位，只保留景點數據
    attractions = group.drop(columns=["year_month", "region"])

    # 過濾出有非 0 數值的景點（若全部為 0 則略過）
    valid_attractions = attractions.loc[:, (attractions != 0).any(axis=0)]
    if valid_attractions.empty:
        continue

    # 對各景點計算總搜尋量，並選出前 5 名
    top_attractions = valid_attractions.sum().nlargest(5).reset_index()
    top_attractions.columns = ["name", "count"]

    # 若結果不為空則存入字典
    if not top_attractions.empty:
        if year_month not in result:
            result[year_month] = {}
        result[year_month][region] = top_attractions.to_dict(orient="records")

# 將結果寫入 JSON 檔案
output_json_path = "./data/city_GitHub.json"
with open(output_json_path, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=4)

print(f"成功生成 JSON: {output_json_path}")
