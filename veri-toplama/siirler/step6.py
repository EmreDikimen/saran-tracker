# Seçilen şiirleri uygulamanın public/veri/siirler klasörüne yazar.
import json, os, sys
out_dir = sys.argv[1]
ERAS = ["Halk ve Tasavvuf", "Âşık Edebiyatı", "Divan Edebiyatı", "Tanzimat", "Servet-i Fünun", "Fecr-i Âti", "Millî Edebiyat", "Cumhuriyet"]
S = json.load(open("selected.json"))
sys.path.insert(0, '.')
from ws import trkey
S.sort(key=lambda p: (ERAS.index(p["era"]), trkey(p["name"])))
os.makedirs(out_dir, exist_ok=True)
for f in os.listdir(out_dir):
    if f.endswith(".json"): os.remove(os.path.join(out_dir, f))
index = {"eras": ERAS, "total": sum(len(p["poems"]) for p in S),
         "poets": [{"slug": p["slug"], "name": p["name"], "years": p["years"], "era": p["era"], "count": len(p["poems"])} for p in S]}
json.dump(index, open(os.path.join(out_dir, "index.json"), "w"), ensure_ascii=False, separators=(",", ":"))
for p in S:
    json.dump({"slug": p["slug"], "name": p["name"], "years": p["years"], "era": p["era"], "poems": p["poems"]},
              open(os.path.join(out_dir, p["slug"] + ".json"), "w"), ensure_ascii=False, separators=(",", ":"))
print(index["total"], "şiir,", len(S), "şair ->", out_dir)
