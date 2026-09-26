# Mekanikler

Uygulamanın iki ana kolu var: **Günlük Ritim** ve **Büyük Resim**.

---

## 1. Günlük Ritim (Kahve Fincanları)

Ekranın üst köşesinde en fazla 3 minimalist kahve fincanı durur. Kullanıcının kalan hakkını gösterir.

**Çözdüğü problem:** İlk gün aşırı yüklenip (hiperfokus) tüm dopamini tüketme ve üçüncü gün bırakma riski.

### Harcama

Fincan, bir **odak oturumu bileti** gibi çalışır.

- Bir kategoriye odak oturumu başlatmak için girildiğinde **1 fincan** harcanır.
- Oturum boyunca kullanıcı o kategoride dilediği kadar içerikle vakit geçirebilir.

### Oturum ne zaman biter

Süre veya dakika kısıtı yok. Oturumu **sayfa hiyerarşisi** belirler. Kullanıcı o kategorinin içinde kaldığı sürece, yani şiir odasında okuduğu, bitirdiği ve diğer şiirlere göz attığı sürece o tek fincan geçerlidir. Ana sayfaya (atölye masası / mantar pano) döndüğü an oturum kapanır.

### Yenilenme (3 saatlik cooldown)

- Üst sınır **3 fincan**.
- Fincan sayısı 3'ün altına düştüğü an **180 dakikalık** geri sayım başlar.
- Süre dolunca +1 fincan eklenir.
- Sayı hâlâ 3'ün altındaysa bir sonraki 3 saatlik döngü otomatik başlar.
- 3'e ulaşınca sayaç durur. İstifleme ve taşma yoktur.

Üç saatlik aralık bilinçli seçildi: amaç gün içine yayılan doğal odak molaları yaratmak.

### Görsel durum

- **Dolu fincan:** Renkli, aktif illüstrasyon.
- **Boş fincan:** Siyah-beyaz, kontur çizim.
- Dolmakta olan ilk boş fincanın altında zarif bir geri sayım (örneğin `02:14`).

### Fincan bittiğinde (0 fincan)

Kapı tamamen kapanır, kullanıcı **arşive bile bakamaz**. Bu bilinçli bir DEHB frenidir; yoksa "arşivde kaybolup dopamin tüketme" tuzağına düşülür. Geri sayım beklenir.

Ekran notunun geri sayımı söylemesi gerekiyor. Taslak:

> "Fincanlar boş. Bir sonrakinin demlenmesine 02:14 var."

*Eski metin ("yarın sabah demlenecek") günlük yenilenmeye göre yazılmıştı, 3 saatlik cooldown ile geçersiz kaldı. Nihai metin belirlenecek.*

---

## 2. Büyük Resim (Sürpriz ve Koleksiyon Puzzle'ı)

Her 100 günlük içerik döngüsünün arkasında gizli bir illüstrasyon ya da tablo vardır. Kaplumbağa Terbiyecisi, Yıldızlı Gece veya özel çizilmiş bir illüstrasyon olabilir.

### İçerik havuzu

- Her döngünün arkasında 100 içerikli bir havuz durur (örneğin 100 şiir).
- Kullanıcıya her gün havuzdan **tamamen rastgele ve sürpriz** bir içerik gelir. Seçim kullanıcıya bırakılmaz.

### Parça açılması

- Kullanıcı **o günkü ilk içerik tüketimini** tamamladığında 100 parçalık görselin rastgele bir karosu açılır, yerine oturur ve renklenir.
- Parça **yalnızca kilitli parçalar arasından** seçilir. Böylece 100 günde tamamlanma garanti edilir.
- Tablo başta tamamen sisli bir silüettir, parçalar açıldıkça ortaya çıkar.
- Hangi parçaların daha önce açıldığı ana ekranda açıkça görünür.
- Açılan parçalar hiçbir koşulda geri alınmaz. Seri kırılsa da kaybolmazlar.
- 100 parça bitince tablo tamamlanır, kullanıcı dijital bir sergi kartı ya da özel bir damga alır ve yeni bir 100 parçalık tablo başlar.

**Neden:** Duolingo tarzı düz çizgisel yollar "bitmeyen ödev" hissi verip kaygı yaratır. Puzzle'ın rastgele açılması hem merakı diri tutar hem koleksiyon yapma dürtüsünü besler. Puzzle %60-70'e geldiğinde ise "az kaldı, şu köşeyi de tamamlayayım" hissi devamlılık sağlar.

---

## 3. Seri Toleransı

Haftada en az 1-2 dondurma veya kurtarma hakkı verilir. Amaç zihni suçluluktan korumak.

---

## Ekran Akışı

1. **Ana ekran (atölye masası / mantar pano):** Ortada silüeti görünen 100 parçalı yapboz. Üstte kalan fincanlar (☕☕) ve genel seri (🔥 12).
2. **Kategoriye giriş:** "Günün Şiirini Keşfet" butonuna basılır, 1 fincan harcanır ve odak oturumu başlar.
3. **Oturum:** Rastgele bir içerik gelir. Kullanıcı okur, "Okudum" der, isterse aynı kategoride başka içeriklere de göz atar.
4. **Ödül:** Günün ilk tamamlanan içeriğinde ekran yapboza döner ve yeni parça parlayarak yerine oturur.
5. **Çıkış:** Ana sayfaya dönüldüğünde oturum kapanır.

---

## Açık Sorular

- "Aktif kategori sayısına göre sabit üst sınır" ne demek? Üst sınır her zaman 3 mü, yoksa kaç kategori aktifse ona göre mi belirleniyor?
- Fincan bittiğinde gösterilecek metin ne olacak? Mevcut metin 3 saatlik yenilenmeye uymuyor.
- Puzzle tüm kategoriler için tek mi, kategori başına ayrı mı?
- Günde 3 fincan da harcansa yalnızca tek parça mı açılıyor?
- Havuzdaki 100 içerik bitince yeni havuz nasıl gelecek?
- Seri neye göre korunuyor: fincan harcamak mı, içerik tamamlamak mı?
- Puzzle görseli hangi kaynaktan gelecek? (Telif için kamu malı müze arşivleri ya da özel illüstrasyon)
