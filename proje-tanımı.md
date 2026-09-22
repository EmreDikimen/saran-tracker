# Proje Tanımı (MVP)

## Fikir

Kültür ve sanat alanında günlük mikro alışkanlık kazandıran bir uygulama. Kullanıcı günde 90 saniye ile 2 dakika arasında bir içerik tüketir: bir şiir, bir tablo, bir film karesi.

Fark şu: **içeriği tükettiğin yer ile "yaptım" dediğin yer aynı ekran.** Bugün kullanıcı bir uygulamada şiirini okuyup başka bir uygulamada tik atmak zorunda. Bu geçiş odağı dağıtıyor.

## Kime

Dikkat süresi kısa olan ve alışkanlık takibinde zorlanan kullanıcılar, özellikle DEHB'li bireyler. Bu kitle için uygulama değiştirmek en büyük engel.

## Nasıl çalışır

İki ana kol var, ikisi de [mekanik-tasarimi.md](mekanik-tasarimi.md) dosyasında anlatılıyor:

1. **Günlük Ritim:** Günde 2-3 kahve fincanı kadar hak. Bitince o gün kapanır.
2. **Büyük Resim:** Her tamamlanan içerik, açılmakta olan bir tablonun bir parçasını açar.

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

**1. Ana ekran.** Ortada yarı açılmış tablo, üstte kalan fincanlar ve seri sayısı. Altta keşif butonu.

**2. Tüketim ekranı (Zen modu).** Menüler gizlenir. Eser, iki cümlelik kürasyon notu ve künye. Altında "Okudum / İnceledim" butonu. Basınca hafif bir titreşim gelir, ekran tabloya döner ve yeni parça yerine oturur.

**3. Arşiv.** Kullanıcının kalp butonuyla favorilediği eserler temiz bir galeride birikir. Tamamlanan tablolar burada sergilenir.

## Şimdilik yapmayacaklarımız

Bu fikirler iptal değil, sonraya bırakıldı:

- **Sanat Rafı:** Kategori başına seviye atlayan ikonik objeler. Puzzle ile aynı işi yaptığı için şimdilik dışarıda.
- **Arkadaş serisi ve profil ziyareti.** Önce tek kişilik deneyim oturmalı.
- **Yıl sonu özeti (Wrapped).** İçerik etiketleme altyapısı kurulduktan sonra.

## Açık sorular

- Herkes aynı günlük içeriği mi görecek, yoksa içerik kullanıcıya özel rastgele mi olacak?
- Fincanlar bitince içerik tamamen mi kapanacak, yoksa sadece ödül mü duracak?
- Şiir ve müzik içerikleri için telif nasıl çözülecek?
