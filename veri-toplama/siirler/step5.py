# Şair başına kota ve bilinirlik önceliğiyle 500 şiir seçer.
import json, re, sys
sys.path.insert(0, '.')
from ws import trkey
D = json.load(open("eligible.json")); POETS = D["poets"]
FLOOR = {"Orhan Veli Kanık": 50, "Mehmet Âkif Ersoy": 35, "Ahmet Haşim": 30, "Yunus Emre": 25, "Karacaoğlan": 28, "Tevfik Fikret": 19}
CAP = {"Cenab Şahabeddin": 20, "Orhan Veli Kanık": 60, "Mehmet Emin Yurdakul": 15, "Mehmet Âkif Ersoy": 45, "Pir Sultan Abdal": 30,
       "Mihrî Hatun": 15, "Şah Hatayi": 15, "Muhyiddin Abdal": 10}
def nrm(s):
    s = s.replace("İ", "i").replace("I", "ı").lower()
    for a, b in zip("âîûêçğıöşü’'", "aiuecgiosu  "): s = s.replace(a, b)
    return re.sub(r"[^a-z0-9 ]+", " ", s)
FAMOUS = {
 "Orhan Veli Kanık": ["istanbul u dinliyorum", "anlatamiyorum", "kitabe i seng i mezar", "robenson", "sere serpe", "cimbizli siir", "delikli siir",
   "kuslar yalan soyler", "galata koprusu", "altindag", "guzel havalar", "efkarlanirim", "deniz", "kaside", "harbe giden", "dalga",
   "istanbul turkusu", "karanfil", "agac", "tahattur", "meyhane", "sevdaya mi tutuldum", "raki sisesi", "pazar", "kardes turkusu", "yagmur",
   "bir kis sabahi", "hurriyete dogru", "vatan icin", "abbas", "pireli siir", "tren gecerken", "macera", "kuyu", "gun olur", "iskele",
   "eskiler aliyorum", "bayram", "cevap", "gemilerim", "denizi ozliyenler icin", "gozlerim", "birdenbire", "bir sehri birakmak"],
 "Mehmet Âkif Ersoy": ["canakkale sehitlerine", "istiklal marsi", "korkma", "bulbul", "hasta", "seyfi baba", "mahalle kahvesi", "kufe",
   "suleymaniye kursusunden", "fatih kursusu", "ey yolcu", "bayram", "azim", "kosova", "hurriyet", "berlin hatiralari", "husran", "bir gece",
   "sabah namazi", "durmayalim", "ordunun duasi", "kastamonu vaazi", "fatih camii", "edirne", "atiyi karanlik"],
 "Tevfik Fikret": ["sis", "rubab in cevabi", "ferda", "promete", "bir kiz mektebi icin", "haluk", "balikcilar", "hasta cocuk", "ramazan sadakasi",
   "doksan bese dogru", "tarih i kadim", "agustos bocegi", "bana kimsin diye sorma", "bir icim su", "oksuz", "izler", "sancag i serif"],
 "Ahmet Haşim": ["merdiven", "o belde", "bir gunun sonunda arzu", "karanlik", "bulbul", "agac", "havuz", "hasta kadin", "mehtaba karsi",
   "gol saatleri", "yollar", "parilti", "butun omrunce", "tahassur", "aksam", "ses", "nehir", "sanatkar"],
 "Mehmet Emin Yurdakul": ["cenge giderken", "ben bir turk um", "anadolu", "turan a dogru", "barbaros", "ey turk uyan", "seyyah"],
 "Pir Sultan Abdal": ["gelin canlar bir olalim", "dun gece seyrim icinde", "hizir pasa", "uyur idik uyardilar", "kanli zalimin", "kalem tutan",
   "ezeli dostum", "melamet hirkasini", "gitme durnam", "otme bulbul", "demedim mi", "turnalar"],
 "Yunus Emre": ["daglar ile taslar ile", "cagirayim mevlam", "gelin tanis olalim", "ben yururum yana yana", "askin aldi benden beni", "sari cicek",
   "severim ben seni", "dava icin", "gonuller yapmaya", "biz dunyadan gider olduk", "dervislik", "sensuz yola"],
 "Karacaoğlan": ["ela gozlerini sevdigim", "su yalan dunyaya", "incecik", "yuce dag basinda", "bahar", "ela gozlu", "bana kara diyen", "ilgit ilgit"],
 "Cenab Şahabeddin": ["elhan i sita", "yakaza", "su kenarinda", "terane", "aks i mah", "baran i bahar", "beyaz", "mai", "kurban"],
 "Fuzûlî": ["su kasidesi", "beni candan usandirdi", "ask derdiyle", "ya rab bela yi ask", "leyla"],
 "Bâkî": ["kanuni", "mersiye", "kadrini seng i musalla"],
 "Nedîm": ["bir safa bahsedelim", "sarki", "sadabad", "gel", "lale"],
 "Dadaloğlu": ["kalkti goc eyledi", "ferman padisahin"],
 "Köroğlu": ["bolu beyi", "benden selam", "kirat", "ben bir koroglu yum"],
 "Namık Kemal": ["hurriyet kasidesi", "vatan mersiyesi", "vaveyla"],
}
by = {}
def famous(p):
    t = nrm(p["title"] + " " + p["text"].split("\n")[0])
    return any(k in t for k in FAMOUS.get(p["poet"], []))
def lineset(p): return {nrm(l).strip() for l in p["text"].split("\n") if l.strip()}
for p in sorted(D["poems"], key=lambda p: (not famous(p), -p["views"])):
    lst = by.setdefault(p["poet"], [])
    ls = lineset(p)
    # Aynı şiirin farklı başlıklı kopyalarını ele (satırların yarısından fazlası ortaksa).
    if any(len(ls & lineset(q)) > 0.5 * min(len(ls), len(lineset(q))) for q in lst): continue
    lst.append(p)
sel = {a: ps[:CAP.get(a, 999)] for a, ps in by.items()}
total = sum(map(len, sel.values()))
# 500'e inene kadar, 8'den fazla şiiri olan şairlerden en az okunanı çıkar.
while total > 500:
    a = min((a for a in sel if len(sel[a]) > max(8, FLOOR.get(a, 0))), key=lambda a: (sel[a][-1]["views"], -len(sel[a])))
    sel[a].pop(); total -= 1
print(total, {a: len(v) for a, v in sorted(sel.items(), key=lambda x: -len(x[1]))})

def slug(s):
    s = s.replace("İ", "i").replace("I", "ı").lower()
    for a, b in zip("çğıöşüâîûê'", "cgiosuaiue-"): s = s.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")

out = []
for a, ps in sel.items():
    years, era = POETS[a]
    items, used = [], set()
    for p in sorted(ps, key=lambda p: trkey(p["title"])):
        # "Ağaç (Orhan Veli)" gibi ayırt edici ekleri at.
        title = re.sub(r"\s*\([^)]*(?:%s|şiir)[^)]*\)$" % re.escape(a.split()[0]), "", p["title"]).strip()
        sid = slug(title) or "siir"
        while sid in used: sid += "-2"
        used.add(sid)
        # PDF'ten gelen sayfalarda metnin başında başlık ve şair adı tekrar ediyor; at.
        lines = p["text"].split("\n")
        def is_head(l):
            n = " ".join(nrm(l).split())
            if n == " ".join(nrm(a).split()): return True
            # Başlık ancak BÜYÜK HARFLE yazılmışsa sayfa başlığıdır; halk şiirlerinde ilk dize başlıkla aynıdır.
            return l.strip().isupper() and n in {" ".join(nrm(title).split()), " ".join(nrm(p["title"]).split())}
        while lines and (not lines[0].strip() or is_head(lines[0])):
            lines.pop(0)
        items.append({"id": sid, "title": title, "text": "\n".join(lines).strip(),
                      "source": "https://tr.wikisource.org/wiki/" + p["title"].replace(" ", "_")})
    out.append({"slug": slug(a), "name": a, "years": years, "era": era, "poems": items})
json.dump(out, open("selected.json", "w"), ensure_ascii=False, indent=1)
