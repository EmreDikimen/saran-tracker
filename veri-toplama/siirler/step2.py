# Aday sayfaları toplar ve wikitext'lerini indirir.
import sys, json, re; sys.path.insert(0, '.')
from ws import api
kisi = json.load(open("kisi.json"))
# Telifi kesin dolmuş (ölüm <= 1955) ya da halk/divan şairi olduğu bilinen kişiler. Hüseyin Siret (1959) hariç.
ALLOWED = {k: v for k, v in kisi.items() if k.startswith("Kişi:") and k != "Kişi:Hüseyin Siret Özsever"
           and (not re.match(r"^\d{4}$", v["death"]) or int(v["death"]) <= 1955)}
print(len(ALLOWED), "kişi")

def catmembers(cat, depth=1):
    out, cont = [], {}
    while True:
        r = api(action="query", list="categorymembers", cmtitle=cat, cmlimit=500, **cont)
        for m in r["query"]["categorymembers"]:
            if m["ns"] == 0: out.append(m["title"])
            elif m["ns"] == 14 and depth > 0: out += catmembers(m["title"], depth - 1)
        if "continue" not in r: return out
        cont = r["continue"]

EXCLUDE_CATS = {"Kategori:Nazım Hikmet şiirleri", "Kategori:Yahya Kemal Beyatlı şiirleri", "Kategori:Magcan Cumabay şiirleri",
                "Kategori:Süleyman Çolpan şiirleri", "Kategori:Mevlana", "Kategori:Ahmed Yesevi hikmetleri"}
r = api(action="query", list="categorymembers", cmtitle="Kategori:Şairine göre şiirler", cmlimit=500, cmtype="subcat")
cats = [m["title"] for m in r["query"]["categorymembers"] if m["title"] not in EXCLUDE_CATS]
cats += ["Kategori:Karacaoğlan türküleri", "Kategori:Karacaoğlan", "Kategori:Yunus Emre şiirleri", "Kategori:Yunus Emre",
         "Kategori:Dadaloğlu", "Kategori:Kul Himmet", "Kategori:Fuzûlî", "Kategori:Bâkî gazelleri", "Kategori:Cenab Şahabeddin şiirleri"]
cand = {}
for c in cats:
    try: ms = catmembers(c)
    except Exception as e: print("hata", c, e); continue
    print(c, len(ms))
    for t in ms: cand.setdefault(t, {"cat": c})
for k, v in ALLOWED.items():
    for t in v["links"]: cand.setdefault(t, {"kisi": k})
print("aday:", len(cand))

titles = list(cand)
pages = {}
for i in range(0, len(titles), 50):
    r = api(action="query", prop="revisions|categories", rvprop="content", rvslots="main", cllimit=500, titles="|".join(titles[i:i+50]), redirects=1)
    for p in r["query"]["pages"]:
        if "revisions" not in p: continue
        pages[p["title"]] = {"wt": p["revisions"][0]["slots"]["main"]["content"], "cats": [c["title"] for c in p.get("categories", [])]}
    print(i, len(pages), end="; ", flush=True)
json.dump({"cand": cand, "pages": pages, "allowed": ALLOWED}, open("pages.json", "w"), ensure_ascii=False)
