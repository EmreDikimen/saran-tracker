# Proje Tanımı (MVP)

## Fikir

Kültür ve sanat alanında günlük mikro alışkanlık kazandıran bir uygulama. Kullanıcı günde 90 saniye ile 2 dakika arasında bir içerik tüketir: bir şiir, bir tablo, bir film karesi.

Fark şu: **içeriği tükettiğin yer ile "yaptım" dediğin yer aynı ekran.** Bugün kullanıcı bir uygulamada şiirini okuyup başka bir uygulamada tik atmak zorunda. Bu geçiş odağı dağıtıyor.

## Kime

Dikkat süresi kısa olan ve alışkanlık takibinde zorlanan kullanıcılar, özellikle DEHB'li bireyler. Bu kitle için uygulama değiştirmek en büyük engel.

## Nasıl çalışır

İki ana kol var, ikisi de [mekanik-tasarimi.md](mekanik-tasarimi.md) dosyasında anlatılıyor:

1. **Günlük Ritim:** En fazla 3 kahve fincanı. Bir kategoriye girmek 1 fincan harcar, o oturumda kullanıcı istediği kadar içerikle vakit geçirebilir. Fincanlar 3 saatte bir yenilenir; hiç kalmayınca uygulama tamamen kapanır.
2. **Büyük Resim:** Günün ilk tamamlanan içeriği, açılmakta olan bir tablonun rastgele bir parçasını açar. 100 parça bitince yeni tablo başlar.

## İçerik Kategorileri

| Kategori | Günlük mikro içerik |
| --- | --- |
| Şiir | Kısa bir şiir veya vurucu bir dize |
| Tablo | Bir tablo görseli ve iki cümlelik analiz |
| Animasyon | İkonik bir sahne karesi ve renk/kompozisyon notu |
| Film Karesi | Kült bir sahne ve sinematografi detayı |
| Müzik | 30 saniyelik önizleme ve parçanın mini hikâyesi |
| Günün Kelimesi | Çevrilemeyen veya felsefi bir kavram |

MVP'de tüm kategoriler olmayacak. Telifi en temiz olanlarla başlanacak: tablo, kamu malı şiir ve günün kelimesi.

## Ekranlar

**1. Ana ekran (atölye masası / mantar pano).** Ortada yarı açılmış tablo, üstte kalan fincanlar ve seri sayısı. Altta keşif butonu. Bu ekrana dönmek, açık olan odak oturumunu kapatır.

**2. Tüketim ekranı (Zen modu).** Menüler gizlenir. Eser, iki cümlelik kürasyon notu ve künye. Altında "Okudum / İnceledim" butonu. Basınca hafif bir titreşim gelir; günün ilk içeriğiyse ekran tabloya döner ve yeni parça yerine oturur.

**3. Arşiv.** Kullanıcının kalp butonuyla favorilediği eserler temiz bir galeride birikir. Tamamlanan tablolar burada sergilenir. Fincanlar bittiğinde arşiv de kapanır.

## Şimdilik yapmayacaklarımız

Bu fikirler iptal değil, sonraya bırakıldı:

- **Sanat Rafı:** Kategori başına seviye atlayan ikonik objeler. Puzzle ile aynı işi yaptığı için şimdilik dışarıda.
- **Arkadaş serisi ve profil ziyareti.** Önce tek kişilik deneyim oturmalı.
- **Yıl sonu özeti (Wrapped).** İçerik etiketleme altyapısı kurulduktan sonra.
- **Ajanda ve koçluk modülü.** Şu an test ve kuluçka aşamasında. İlk odak "Mikro Kreatif Tüketim & Atölye Masası". İleride maskot üzerinden sohbet ya da dahili bir dijital ajanda modülü olarak eklenecek.

## Açık sorular

- Herkes aynı günlük içeriği mi görecek, yoksa içerik kullanıcıya özel rastgele mi olacak?
- Şiir ve müzik içerikleri için telif nasıl çözülecek?
