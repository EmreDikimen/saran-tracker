# Şairi eşler, telif/biçim filtrelerini uygular, okunma sayılarını ekler.
import sys, json, re, statistics; sys.path.insert(0, '.')
from ws import api
P = json.load(open("raw_poems.json"))

# Kanonik şair tablosu: ad, yaşam yılları, dönem. Hepsi 1955 ve öncesinde ölmüş.
POETS = {
 "Yunus Emre": ("1240–1321", "Halk ve Tasavvuf"), "Kaygusuz Abdal": ("14.–15. yy", "Halk ve Tasavvuf"),
 "Eşrefoğlu Rumî": ("1353–1469", "Halk ve Tasavvuf"), "Pir Sultan Abdal": ("16. yy", "Halk ve Tasavvuf"),
 "Kul Himmet": ("16. yy", "Halk ve Tasavvuf"), "Muhyiddin Abdal": ("?–1529", "Halk ve Tasavvuf"),
 "Kul Nesimi": ("17. yy", "Halk ve Tasavvuf"), "Niyâzî-i Mısrî": ("1618–1694", "Halk ve Tasavvuf"),
 "Teslim Abdal": ("17. yy", "Halk ve Tasavvuf"), "Uzleti Baba": ("19. yy", "Halk ve Tasavvuf"),
 "Köroğlu": ("16. yy", "Âşık Edebiyatı"), "Karacaoğlan": ("1606–1689", "Âşık Edebiyatı"),
 "Âşık Ömer": ("1621–1707", "Âşık Edebiyatı"), "Dadaloğlu": ("1785–1868", "Âşık Edebiyatı"),
 "Erzurumlu Emrah": ("1775–1854", "Âşık Edebiyatı"), "Âşık Dertli": ("1772–1846", "Âşık Edebiyatı"),
 "Ruhsatî": ("1835–1911", "Âşık Edebiyatı"),
 "Şeyhî": ("?–1431", "Divan Edebiyatı"), "Ahmed Paşa": ("1426–1497", "Divan Edebiyatı"),
 "Mihrî Hatun": ("1460–1506", "Divan Edebiyatı"), "Necati": ("?–1509", "Divan Edebiyatı"),
 "Şah Hatayi": ("1487–1524", "Divan Edebiyatı"), "Fuzûlî": ("1480–1556", "Divan Edebiyatı"),
 "Sürûrî": ("?–1591", "Divan Edebiyatı"), "Bâkî": ("1526–1600", "Divan Edebiyatı"),
 "Nef'î": ("1572–1635", "Divan Edebiyatı"), "Nâbî": ("1642–1712", "Divan Edebiyatı"),
 "Nedîm": ("1681–1730", "Divan Edebiyatı"), "Fıtnat Hanım": ("?–1780", "Divan Edebiyatı"),
 "Şeyh Gâlib": ("1757–1799", "Divan Edebiyatı"), "Şeref Hanım": ("1809–1861", "Divan Edebiyatı"),
 "Şinasi": ("1826–1871", "Tanzimat"), "Ziya Paşa": ("1825–1880", "Tanzimat"), "Namık Kemal": ("1840–1888", "Tanzimat"),
 "Recaizade Mahmut Ekrem": ("1847–1914", "Tanzimat"), "Abdülhak Hâmid Tarhan": ("1852–1937", "Tanzimat"),
 "Leylâ Hanım": ("1850–1936", "Tanzimat"), "Tevhide Hanım": ("19. yy", "Tanzimat"),
 "Tevfik Fikret": ("1867–1915", "Servet-i Fünun"), "Cenab Şahabeddin": ("1870–1934", "Servet-i Fünun"),
 "Ali Ekrem Bolayır": ("1867–1937", "Servet-i Fünun"), "Celâl Sahir Erozan": ("1883–1935", "Servet-i Fünun"),
 "Ahmet Haşim": ("1884–1933", "Fecr-i Âti"), "Mehmet Âkif Ersoy": ("1873–1936", "Millî Edebiyat"),
 "Mehmet Emin Yurdakul": ("1869–1944", "Millî Edebiyat"), "Ziya Gökalp": ("1876–1924", "Millî Edebiyat"),
 "Ömer Seyfettin": ("1884–1920", "Millî Edebiyat"), "Rıza Tevfik Bölükbaşı": ("1869–1949", "Millî Edebiyat"),
 "İbrahim Alâeddin Gövsa": ("1889–1949", "Millî Edebiyat"), "Neyzen Tevfik": ("1879–1953", "Cumhuriyet"),
 "Sabahattin Ali": ("1907–1948", "Cumhuriyet"), "Rüştü Onur": ("1920–1942", "Cumhuriyet"),
 "Orhan Veli Kanık": ("1914–1950", "Cumhuriyet"),
}
ALIAS = {"Mehmet Akif Ersoy": "Mehmet Âkif Ersoy", "Eşrefoğlu Rumi": "Eşrefoğlu Rumî", "Fuzûli": "Fuzûlî", "Nâbi": "Nâbî",
 "Nedim": "Nedîm", "Nefi": "Nef'î", "Şeyh Galip": "Şeyh Gâlib", "Aşık Dertli": "Âşık Dertli", "Ruhsati": "Ruhsatî",
 "Abdülhak Hamit Tarhan": "Abdülhak Hâmid Tarhan"}
CAT_AUTHOR = {"Kategori:Köroğlu": "Köroğlu", "Kategori:Ruhsati deyişleri": "Ruhsatî", "Kategori:Pir Sultan Abdal eserleri": "Pir Sultan Abdal",
 "Kategori:Karacaoğlan türküleri": "Karacaoğlan", "Kategori:İbrahim Alâeddin Gövsa Şiirleri": "İbrahim Alâeddin Gövsa"}
KISI_AUTHOR = {"Kişi:Rıza Tevfik Bölükbaşı": "Rıza Tevfik Bölükbaşı"}

def resolve(p):
    a = ALIAS.get(p["author"], p["author"])
    if a in POETS: return a
    if a in ("Anonim", "", "Âşık"):
        src = p["src"]
        return CAT_AUTHOR.get(src.get("cat")) or (KISI_AUTHOR.get(src.get("kisi")) if a == "" else None)
    return None

def norm(s):
    s = s.replace("İ", "i").replace("I", "ı").lower()
    for a, b in zip("âîûêʼ’'‐", "aiue    "): s = s.replace(a, b)
    return re.findall(r"\w+", s)

def pick_block(p):
    blocks = [b for b in p["blocks"] if b.strip()]
    if len(blocks) <= 1: return p["text"]
    tw = [w for w in norm(re.sub(r"\(.*?\)", "", p["title"])) if len(w) > 2]
    def score(b):
        head = set(norm(" ".join(b.split("\n")[:2])))
        return sum(w in head for w in tw) / max(1, len(tw))
    best = max(blocks, key=score)
    if score(best) >= 0.5: return best
    # Başlık hiçbir blokla eşleşmiyorsa bloklar büyük ihtimalle tek şiirin parçaları (ör. Çanakkale Şehitlerine).
    return "\n\n".join(blocks) if len(blocks) <= 3 else None

arabic = re.compile(r"[؀-ۿ]")
keep, drop = [], {}
for p in P:
    a = resolve(p)
    why = None
    t = pick_block(p)
    if t is None: drop[p["title"]] = "çok şiirli sayfa"; continue
    p["text"] = t
    ls = [l for l in p["text"].split("\n") if l.strip()]
    if not a: why = "şair dışı: " + p["author"]
    elif p["translator"]: why = "çeviri"
    elif "/" in p["title"] or "Antoloji" in p["title"]: why = "derleme sayfası"
    elif len(ls) < 4: why = "çok kısa"
    elif len(ls) > 160: why = "çok uzun"
    elif statistics.mean(len(l) for l in ls) > 60: why = "düzyazı"
    elif arabic.search(p["text"]): why = "Arap harfli"
    elif re.search(r"[ṣġḳẖāīūʿḥżṭẓñ]", p["text"]): why = "bilimsel transkripsiyon"
    elif p["title"] in ("Nağme-i Seher",): why = "kitap kapağı"
    if why: drop[p["title"]] = why; continue
    p["poet"] = a; keep.append(p)

# Bilinirlik için son 60 günlük Vikikaynak okunma sayıları.
views = {}
titles = [p["title"] for p in keep]
for i in range(0, len(titles) if "--noviews" not in sys.argv else 0, 50):
    r = api(action="query", prop="pageviews", pvipdays=60, titles="|".join(titles[i:i+50]))
    for pg in r["query"]["pages"]:
        views[pg["title"]] = sum(v or 0 for v in (pg.get("pageviews") or {}).values())
for p in keep: p["views"] = views.get(p["title"], 0); p.pop("blocks", None)
from collections import Counter
print(len(keep), "uygun;", Counter(drop.values()))
print(Counter(p["poet"] for p in keep).most_common())
json.dump(drop, open("drop.json", "w"), ensure_ascii=False, indent=1)
json.dump({"poets": POETS, "poems": keep}, open("eligible.json", "w"), ensure_ascii=False, indent=1)
