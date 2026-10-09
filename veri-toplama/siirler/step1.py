# Şair adaylarını bulur: Kişi sayfası, ölüm yılı, aday eser başlıkları.
import sys, json, re; sys.path.insert(0, '.')
from ws import api

POETS = ["Yunus Emre","Karacaoğlan","Dadaloğlu","Pir Sultan Abdal","Kul Himmet","Kaygusuz Abdal","Nesîmî","Fuzûlî","Bâkî",
 "Nedîm","Nef'î","Şeyh Gâlib","Şeyhî","Mihrî Hatun","Hatayi","Muhyiddin Abdal","Eşrefoğlu Rumî","Erzurumlu Emrah","Ruhsatî",
 "Köroğlu","Niyâzî-i Mısrî","Ziya Paşa","Namık Kemal","Şinasi","Recaizade Mahmut Ekrem","Abdülhak Hâmid Tarhan","Tevfik Fikret",
 "Cenab Şahabeddin","Ahmet Haşim","Mehmet Âkif Ersoy","Mehmet Emin Yurdakul","Ziya Gökalp","Ömer Seyfettin","Ali Ekrem Bolayır",
 "Celâl Sahir Erozan","Rıza Tevfik Bölükbaşı","İbrahim Alâeddin Gövsa","Neyzen Tevfik","Orhan Veli Kanık","Sabahattin Ali","Rüştü Onur",
 "Sürûrî","Seyrani","Âşık Ömer","Gevherî","Kul Nesimi","Hacı Bektaş Veli","Âşık Dertli","Bayburtlu Zihni","Kemal Paşazade","Necati",
 "Ahmed Paşa","Zâtî","Nâbî","Şeyh Galib","Tevfik Fikret","Muallim Naci","Halit Ziya","Hüseyin Siret","Kemalpaşazade Said",
 "Ahmet Kutsi Tecer","Faik Ali Ozansoy","Süleyman Nazif","Ahmed Nedim","Emin Bülend Serdaroğlu","Ali Canip Yöntem","Yusuf Ziya Ortaç",
 "Enis Behiç Koryürek","Halit Fahri Ozansoy","Orhan Seyfi Orhon","Âşık Seyranî","Âşık Ruhsati","Kâzım Paşa","Leyla Hanım","Şeref Hanım",
 "Fıtnat Hanım","Nigâr Hanım","Fatma Aliye","Akif Paşa","Yenişehirli Avni","Leskofçalı Galip","Hersekli Arif Hikmet","Ahmet Vefik Paşa",
 "Mehmet Rauf","Ahmet Rasim","İsmail Safa","Tevfik Nevzat","Mahmut Celaleddin","Âşık Paşa","Ahmedî","Süleyman Çelebi","Karacaoğlan"]

def kisi(name):
    r = api(action="query", list="search", srsearch=name, srnamespace=102, srlimit=3)
    hits = [h["title"] for h in r["query"]["search"]]
    return hits

out = {}
for name in dict.fromkeys(POETS):
    hits = kisi(name)
    if not hits: print("YOK", name); continue
    t = hits[0]
    if t in out: continue
    p = api(action="query", prop="revisions|links", rvprop="content", rvslots="main", titles=t, plnamespace=0, pllimit=500)["query"]["pages"][0]
    wt = p["revisions"][0]["slots"]["main"]["content"]
    dy = re.search(r"ölümyılı\s*=\s*([^\n|]*)", wt)
    by = re.search(r"doğumyılı\s*=\s*([^\n|]*)", wt)
    links = [l["title"] for l in p.get("links", [])]
    out[t] = {"query": name, "birth": by.group(1).strip() if by else "", "death": dy.group(1).strip() if dy else "", "links": links}
    print(name, "->", t, "|", out[t]["birth"], "-", out[t]["death"], "|", len(links), "link")
json.dump(out, open("kisi.json", "w"), ensure_ascii=False, indent=1)
