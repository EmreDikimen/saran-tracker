# Şiir arşivi veri hattı

`mobile/public/veri/siirler/` altındaki 500 şiiri Vikikaynak'tan (tr.wikisource.org) üretir.
Yalnızca 1955 ve öncesinde ölmüş şairler alınır (FSEK: ölümden sonra 70 yıl). Çeviriler,
modern bilimsel transkripsiyonlar ve Arap harfli metinler elenir.

Ara JSON'lar repoya girmesin diye betikleri boş bir klasöre kopyalayıp orada, sırayla çalıştır:

```bash
cp veri-toplama/siirler/*.py /tmp/siir && cd /tmp/siir   # önce: mkdir /tmp/siir
python3 step1.py   # şair kişi sayfaları ve ölüm yılları -> kisi.json
python3 step2.py   # aday sayfalar ve wikitext -> pages.json
python3 step3.py   # şiir metinlerini çıkarır -> raw_poems.json
python3 step4.py   # şair eşleme, filtreler, okunma sayısı -> eligible.json
python3 step5.py   # kota ve öncelik listesiyle 500 seçim -> selected.json
python3 step6.py <repo>/mobile/public/veri/siirler   # uygulamaya yazar
```

Şair tablosu (yıllar, dönem) `step4.py`'de; kotalar ve bilinen şiirler listesi `step5.py`'de.
Metinler yayından önce basılı kaynaklarla karşılaştırılmalıdır.
