# Data format conversion
import csv, json

# 어차피 파일 열면 GC가 알아서 꺼줄거임 ^^
src = open("hygdata_v3.csv", "r")
rows = csv.reader(src)
rows = list(rows)

# Reduction
payload = list()
indexes = [id, ra, dec, proper, ci, mag] = [rows[0].index(attr) for attr in ["id", "ra", "dec", "proper", "ci", "mag"]]
for row in rows[1:]:
    if float(row[mag]) <= 7.9:
        reduced = zip([rows[0][index] for index in indexes],[row[index] for index in indexes])
        payload.append(dict(reduced))

# Write to json
dst = open("reduced", "w")
dst.write(json.dumps(payload, indent = 4))
