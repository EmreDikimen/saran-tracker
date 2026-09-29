# saran-tracker

Kültür ve sanat alanında günlük mikro alışkanlık kazandıran bir mobil uygulama. Kullanıcı günde iki dakikalık bir içerikle vakit geçirir: bir şiir, bir tablo, bir şarkı, bir kelime.

## Problem

Alışkanlık takip uygulamaları genellikle alışkanlığın kendisinden daha fazla çaba gerektirir. İçeriği ayrı bir yerde tüketip, başka bir uygulamaya gidip "tik atmak" dikkat dağınıklığını tetikler ve döngüyü kırar.

Bu uygulamada **içeriği tükettiğin yer ile "yaptım" dediğin yer aynı ekran.**

## Kime

Dikkat süresi kısa olan ve alışkanlık takibinde zorlanan kullanıcılar, özellikle DEHB'li bireyler. Bu kitle için uygulama değiştirmek en büyük engel.

## Nasıl çalışır

İki ana kol var:

**1. Günlük Ritim.** Ekranın üst köşesinde, takip edilen kategori sayısı kadar kahve fincanı durur. Bir kategoriye girmek 1 fincan harcar; o oturum boyunca kullanıcı istediği kadar içerikle vakit geçirebilir. Ana sayfaya dönünce oturum kapanır. Fincanlar 3 saatte bir yenilenir, hiç kalmayınca uygulama tamamen kapanır. Amaç, ilk gün hevesi tüketmeyi engellemek.

**2. Büyük Resim.** Her kategorinin kendi 100'lük içerik havuzu ve kendi 100 parçalık tablosu var; ana ekranda aktif kategorininki durur. İçerik havuzdan rastgele gelir. O gün tamamlanan her kategori, kendi tablosundan sisli bir silüetin rastgele bir parçasını açar. Parçalar yalnızca kilitli olanlar arasından seçildiği için hiçbir parça tekrar etmez, tablo 100. parçada tamamlanır. Açılan parçalar hiçbir koşulda geri alınmaz.

Ayrıntılar: [mekanik-tasarimi.md](mekanik-tasarimi.md)

## Çekirdek deneyim: 4 mikro-kreatif modül

Günün Şiiri (daktilo), Günün Sanat Eseri (boya tüpü), Günün Şarkısı (pikap), Günün Kelimesi (parşömen).

Şarkı Spotify'a derin bağlantıyla verildiği için telif riski yok; kelime ve tablo kamu malı kaynaklardan çözülebiliyor. Açık kalan tek kalem şiir.

## Durum

İlk çalışan prototip [mobile/](mobile/) altında (Expo, React Native). Masa, oturum, ödül animasyonu, fincan kilidi ve arşiv çalışıyor. UI ve kütüphane kararlarının gerekçeleri: [ui-arastirmasi.md](ui-arastirmasi.md).

## Prototipi telefonda açma

Mac ile telefon aynı Wi-Fi'da olmalı.

```bash
cd mobile
npm install          # ilk seferde
npx expo start --lan --port 8085
```

- **Uygulama olarak (önerilen):** Telefona **Expo Go**'yu kur (App Store / Play Store) ve terminaldeki QR kodu okut. Titreşim ve gerçek animasyonlar burada.
- **Tarayıcıda:** Telefondan `http://<Mac'in IP'si>:8085` adresini aç. Mac'in IP'sini `ipconfig getifaddr en0` gösterir.
- Sağ alttaki **dev** düğmesi zamanı ileri sarar (+3 saat ile fincan dolar), tabloyu doldurur ya da her şeyi sıfırlar.

Telefon bağlanamazsa ağ cihazlar arası bağlantıyı engelliyor olabilir (okul, kampüs ve misafir ağlarında sık görülür). Bu durumda `npx expo start --tunnel` komutunu dene.

## Dokümanlar

| Dosya | İçerik |
| --- | --- |
| [proje-tanımı.md](proje-tanımı.md) | Ürünün genel tanımı, kategoriler, ekranlar, sonraya bırakılanlar |
| [mekanik-tasarimi.md](mekanik-tasarimi.md) | İki ana mekaniğin kuralları ve ekran akışı |
| [ui-arastirmasi.md](ui-arastirmasi.md) | DEHB için UI ilkeleri, tipografi, renk ve kütüphane seçimi |

## Sıradaki adımlar

1. DEHB'li kullanıcılarla görüşerek temel varsayımı doğrulamak
2. İlk 100 şiirlik havuzu kamu malı kaynaklardan derlemek
3. Fincan, oturum ve puzzle arasındaki sayısal ilişkiyi netleştirmek
4. ~~Ana ekran ve tüketim ekranı için tasarım prototipi~~ (mobile/ altında)
5. Prototipteki şiir metinlerini basılı kaynaktan doğrulamak, şarkılar için gerçek Spotify parça linklerini eklemek
6. v2: Skia ile gerçek bulanık sis, Rive ile fincan ve obje animasyonları
