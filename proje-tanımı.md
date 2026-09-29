# Proje Tanımı (MVP)

## Fikir

Kültür ve sanat alanında günlük mikro alışkanlık kazandıran bir uygulama. Kullanıcı bir kategoriye girer ve iki dakikalık bir içerikle vakit geçirir: bir şiir, bir tablo, bir şarkı, bir kelime. Oturum açıkken isterse aynı kategoride başka içeriklere de bakabilir.

Fark şu: **içeriği tükettiğin yer ile "yaptım" dediğin yer aynı ekran.**

## Problem ve çıkış noktası

Alışkanlık takip uygulamaları genellikle alışkanlığın kendisinden daha fazla çaba gerektirir. İçeriği ayrı bir yerde tüketip, başka bir uygulamaya gidip "tik atmak" dikkat dağınıklığını tetikler ve döngüyü kırar.

Fikir kişisel deneyimden çıktı. Bunun altında dört ayrı sorun var:

- **Karar felci ve başlama zorluğu.** Nöroçeşitli zihinler klasik yapılacaklar veya alışkanlık listelerinde "nereden başlayacağımı bilemiyorum" noktasında takılıyor.
- **Planlama tuzağı.** İş yapmak yerine sistem ve liste kurarak vakit kaybetme döngüsü.
- **Çocuksulaştırılmış uygulamalar.** Piyasadaki alışkanlık araçları ya aşırı karmaşık ya da yetişkin estetiğinden uzak.
- **Duolingo ilhamı.** Kısa sürüş, net seri takibi, düşük sürtünme. Aranan model bu.

## Kime

Dikkat süresi kısa olan ve alışkanlık takibinde zorlanan kullanıcılar, özellikle DEHB'li bireyler. Bu kitle için uygulama değiştirmek en büyük engel.

## Tasarım ilkeleri

Hedef: düşük sürtünme, yüksek zihinsel doyum.

- **Dışsal prefrontal korteks.** Karar yorgunluğu yaşatmadan kullanıcının önüne tek ve küratörlü bir seçenek koymak.
- **Mikro eylemler.** "Bir kitap bitir" değil, "günde 2 dakikalık 1 şiir ya da 1 tablo".
- **Yetişkin atölye estetiği.** Çizgi film maskotları yerine editoryal, sakin, iki boyutlu illüstratif bir çalışma masası atmosferi.
- **Koleksiyon dürtüsü.** Alışkanlığı bir "görev" olmaktan çıkarıp "koleksiyon yapma zevkine" dönüştürmek.

## Nasıl çalışır

İki ana kol var, ikisi de [mekanik-tasarimi.md](mekanik-tasarimi.md) dosyasında anlatılıyor:

1. **Günlük Ritim:** Kategori sayısı kadar kahve fincanı. Bir kategoriye girmek 1 fincan harcar, o oturumda kullanıcı istediği kadar içerikle vakit geçirebilir. Fincanlar 3 saatte bir yenilenir; hiç kalmayınca uygulama tamamen kapanır.
2. **Büyük Resim:** Her kategorinin kendi 100'lük içerik havuzu ve kendi 100 parçalık tablosu var. İçerik havuzdan rastgele gelir, seçimi kullanıcı yapmaz. Tamamlanan her kategori, o kategorinin tablosundan bir parça açar. 100 parça bitince o kategoride yeni tablo başlar.

## Çekirdek Deneyim: 4 Mikro-Kreatif Modül

| Modül | Obje | Günlük mikro içerik |
| --- | --- | --- |
| Günün Şiiri | Daktilo | 2 dakikalık editoryal şiir veya kesit |
| Günün Sanat Eseri | Boya Tüpü | 1 tablo ve 2-3 cümlelik hap bağlam |
| Günün Şarkısı | Pikap | Spotify derin bağlantılı günlük keşif parçası |
| Günün Kelimesi | Parşömen | Dillerden çevrilemeyen nadir duygular |

Telif durumu: şarkı Spotify'a derin bağlantı verildiği için sıfır riskli, kelime ve tablo kamu malı kaynaklardan çözülebilir. **Açık kalan tek kalem şiir.**

## Ekranlar

**1. Ana ekran (atölye masası / mantar pano).** Ortada aktif kategorinin yarı açılmış tablosu. Masanın üzerindeki objelere (daktilo, boya tüpü, pikap, parşömen) dokunarak kategori değiştirilir, tablo da onunla değişir. Üstte kalan fincanlar ve aktif kategorinin serisi. Altta keşif butonu. Bu ekrana dönmek, açık olan odak oturumunu kapatır.

**2. Tüketim ekranı (Zen modu).** Menüler gizlenir. Eser, iki cümlelik kürasyon notu ve künye. Altında "Okudum / İnceledim" butonu. Basınca hafif bir titreşim gelir; günün ilk içeriğiyse ekran tabloya döner ve yeni parça yerine oturur.

**3. Arşiv.** Kullanıcının kalp butonuyla favorilediği eserler temiz bir galeride birikir. Tamamlanan tablolar burada sergilenir. Fincanlar bittiğinde arşiv de kapanır.

## Şimdilik yapmayacaklarımız

Bu fikirler iptal değil, sonraya bırakıldı:

- **Animasyon ve Film Karesi kategorileri.** Çekirdek deneyim dört modüle indirildi. Bu ikisi hem telif açısından en riskli kalemlerdi hem de kapsamı şişiriyordu.
- **Sanat Rafı'nın seviye atlama kısmı.** Objelerin seriye göre tier atlaması şimdilik yok; ilerlemeyi puzzle gösteriyor. Objelerin kendisi (daktilo, boya tüpü, pikap, parşömen) atölye masasında durup kategori geçişini sağlıyor.
- **Arkadaş serisi ve profil ziyareti.** Önce tek kişilik deneyim oturmalı.
- **Yıl sonu özeti (Wrapped).** İçerik etiketleme altyapısı kurulduktan sonra.
- **ADHD Koçu (ajanda ve koçluk modülü).** Defter fotoğrafından plan okuma, dört süzgeçli koçluk motoru ve geri bildirim döngüsü tasarlandı. Şu an odakta değil, sonra ele alınacak.

## Açık sorular

- Şiir içeriği için telif nasıl çözülecek?
