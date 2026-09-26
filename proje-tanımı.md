# Proje Tanımı (MVP)

## Fikir

Kültür ve sanat alanında günlük mikro alışkanlık kazandıran bir uygulama. Kullanıcı bir kategoriye girer ve iki dakikalık bir içerikle vakit geçirir: bir şiir, bir tablo, bir film karesi. Oturum açıkken isterse aynı kategoride başka içeriklere de bakabilir.

Fark şu: **içeriği tükettiğin yer ile "yaptım" dediğin yer aynı ekran.** Bugün kullanıcı bir uygulamada şiirini okuyup başka bir uygulamada tik atmak zorunda. Bu geçiş odağı dağıtıyor.

## Problem ve çıkış noktası

Fikir kişisel deneyimden çıktı. Dört ayrı sorun var:

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

1. **Günlük Ritim:** En fazla 3 kahve fincanı. Bir kategoriye girmek 1 fincan harcar, o oturumda kullanıcı istediği kadar içerikle vakit geçirebilir. Fincanlar 3 saatte bir yenilenir; hiç kalmayınca uygulama tamamen kapanır.
2. **Büyük Resim:** İçerik, 100'lük bir havuzdan rastgele gelir; seçimi kullanıcı yapmaz. Günün ilk tamamlanan içeriği, açılmakta olan bir tablonun rastgele bir parçasını açar. 100 parça bitince yeni tablo başlar.

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

- Şiir ve müzik içerikleri için telif nasıl çözülecek?
- Sunudaki "4 Mikro-Kreatif Modül" ile yukarıdaki altı kategori nasıl örtüşecek?
