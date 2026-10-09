# Wikitext'ten şiir metnini, şairi ve kaynak bilgisini çıkarır.
import sys, json, re, html; sys.path.insert(0, '.')
from ws import api
D = json.load(open("pages.json"))
pages, cand = D["pages"], D["cand"]

def param(wt, *names):
    for n in names:
        m = re.search(r"\|\s*" + n + r"\s*=\s*([^|\n}]*(?:\{\{[^}]*\}\}[^|\n}]*)*)", wt, re.I)
        if m and m.group(1).strip(): return m.group(1).strip()
    return ""

def clean(t):
    t = re.sub(r"<!--.*?-->", "", t, flags=re.S)
    t = re.sub(r"<ref[^>]*/>|<ref.*?</ref>", "", t, flags=re.S)
    for _ in range(3): t = re.sub(r"\{\{[^{}]*\}\}", "", t)
    t = re.sub(r"\[\[(?:Kategori|Category|Dosya|File|Resim):[^\]]*\]\]", "", t)
    t = re.sub(r"\[\[[^|\]]*\|([^\]]*)\]\]", r"\1", t)
    t = re.sub(r"\[\[([^\]]*)\]\]", r"\1", t)
    t = re.sub(r"\[https?://\S+ ([^\]]*)\]", r"\1", t)
    t = re.sub(r"'''?", "", t)
    t = re.sub(r"<br\s*/?>", "\n", t)
    t = re.sub(r"<[^>]+>", "", t)
    t = html.unescape(t).replace(" ", " ")
    lines = [l.rstrip() for l in t.split("\n")]
    lines = [re.sub(r"^[:*#]+\s*", "", l).strip() for l in lines]
    t = "\n".join(lines)
    t = re.sub(r"\n{3,}", "\n\n", t).strip()
    return t

pagecache = {}
def fetch_pages(index, a, b):
    titles = [f"Sayfa:{index}/{n}" for n in range(a, b + 1)]
    out = []
    r = api(action="query", prop="revisions", rvprop="content", rvslots="main", titles="|".join(titles[:50]))
    got = {p["title"]: p["revisions"][0]["slots"]["main"]["content"] for p in r["query"]["pages"] if "revisions" in p}
    for t in titles:
        c = got.get(t, "")
        c = re.sub(r"<noinclude>.*?</noinclude>", "", c, flags=re.S)
        out.append(c)
    return "\n".join(out)

poems = []
skipped = {}
for title, p in pages.items():
    wt = p["wt"]
    if re.match(r"#(YÖNLENDİR|REDIRECT)", wt, re.I): skipped[title] = "redirect"; continue
    author = clean(param(wt, "yazar", "eser sahibi", "esersahibi", "eser_sahibi"))
    translator = clean(param(wt, "çevirmen", "tercüme", "çeviren"))
    body = ""
    m = re.findall(r"<poem[^>]*>(.*?)</poem>", wt, re.S | re.I)
    blocks = []
    if m: body = "\n\n".join(m); blocks = m
    else:
        pm = re.search(r'<pages\s+index="([^"]+)"\s+from=["\']?(\d+)["\']?\s+to=["\']?(\d+)', wt)
        if pm:
            raw = fetch_pages(pm.group(1), int(pm.group(2)), int(pm.group(3)))
            mm = re.findall(r"<poem[^>]*>(.*?)</poem>", raw, re.S | re.I)
            body = "\n\n".join(mm) if mm else raw; blocks = mm or [raw]
    if not body: skipped[title] = "metin yok"; continue
    text = clean(body)
    poems.append({"title": title, "author": author, "translator": translator, "cats": p["cats"],
                  "src": cand.get(title, {}), "text": text, "blocks": [clean(b) for b in blocks],
                  "header_title": clean(param(wt, "başlık"))})
print(len(poems), "metin;", len(skipped), "atlandı")
json.dump(poems, open("raw_poems.json", "w"), ensure_ascii=False, indent=1)
from collections import Counter
print(Counter(p["author"] for p in poems).most_common(80))
