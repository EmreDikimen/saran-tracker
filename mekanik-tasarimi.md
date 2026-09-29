# Mekanikler

Uygulamanın iki ana kolu var: **Günlük Ritim** ve **Büyük Resim**.

---

## 1. Günlük Ritim (Kahve Fincanları)

Ekranın üst köşesinde minimalist kahve fincanları durur. Kullanıcının kalan hakkını gösterir.

**Kapasite, kullanıcının aktif kategori sayısı kadardır.** Dört modülü de açık tutan kullanıcının 4 fincanı olur, iki modül takip eden kullanıcının 2 fincanı. Sabit bir sayı değildir.

**Çözdüğü problem:** İlk gün aşırı yüklenip (hiperfokus) tüm dopamini tüketme ve üçüncü gün bırakma riski.

### Harcama

Fincan, bir **odak oturumu bileti** gibi çalışır.

- Bir kategoriye odak oturumu başlatmak için girildiğinde **1 fincan** harcanır.
- Oturum boyunca kullanıcı o kategoride dilediği kadar içerikle vakit geçirebilir.

### Oturum ne zaman biter

Süre veya dakika kısıtı yok. Oturumu **sayfa hiyerarşisi** belirler. Kullanıcı o kategorinin içinde kaldığı sürece, yani şiir odasında okuyup art arda yeni şiir istediği sürece o tek fincan geçerlidir. Ana sayfaya (atölye masası / mantar pano) döndüğü an oturum kapanır.

### Yenilenme (3 saatlik cooldown)

- Üst sınır, aktif kategori sayısı kadardır.
- Fincan sayısı üst sınırın altına düştüğü an **180 dakikalık** geri sayım başlar.
- Süre dolunca +1 fincan eklenir.
- Sayı hâlâ üst sınırın altındaysa bir sonraki 3 saatlik döngü otomatik başlar.
- Üst sınıra ulaşınca sayaç durur. İstifleme ve taşma yoktur.

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

**Her kategorinin kendi tablosu ve kendi içerik havuzu vardır.** Şiir tablosu, sanat eseri tablosu, şarkı tablosu ve kelime tablosu birbirinden bağımsız dolar. Tablo, gizli bir illüstrasyon ya da başyapıt olabilir: Kaplumbağa Terbiyecisi, Yıldızlı Gece veya özel çizilmiş bir illüstrasyon.

Ana ekranda **yalnızca aktif kategorinin tablosu** durur. Kategoriler arasında geçiş, atölye masasının üzerindeki objelere dokunarak yapılır: daktilo şiire, boya tüpü sanat eserine, pikap şarkıya, parşömen kelimeye götürür. Objeye dokunulduğunda ortadaki tablo o kategorininkiyle değişir.

### İçerik havuzu

- Her kategorinin arkasında 100 içerikli bir havuz durur (örneğin 100 şiir).
- İçerik havuzdan **tamamen rastgele ve sürpriz** gelir. Seçim kullanıcıya bırakılmaz.
- Aynı oturumda kullanıcı "yeni şiir" dediğinde havuzdan yeni bir rastgele içerik gelir. Havuzu gezip beğendiğini seçme diye bir şey yok; kullanıcı listeye değil, sıradaki sürprize bakar.

### Parça açılması

- **Bir kategori o gün tamamlandığında o kategorinin tablosundan bir parça açılır.** Dört kategoriyi de tamamlayan kullanıcı o gün dört farklı tablodan birer parça açar.
- Her tablo günde en fazla bir parça alır. Yani her tablo 100 dolu günde tamamlanır ve kaç kategori takip edildiği bu hızı değiştirmez; dört modül takip eden kullanıcı dört tabloyu paralel doldurur.
- Parça, 100 parçalık görselde rastgele bir karodur; yerine oturur ve renklenir.
- Parça **yalnızca kilitli parçalar arasından** seçilir, hiçbir parça tekrar etmez.
- Tablo başta tamamen sisli bir silüettir, parçalar açıldıkça ortaya çıkar.
- Hangi parçaların daha önce açıldığı ana ekranda açıkça görünür.
- Açılan parçalar hiçbir koşulda geri alınmaz. Seri kırılsa da kaybolmazlar.
- 100 parça bitince tablo tamamlanır, kullanıcı dijital bir sergi kartı ya da özel bir damga alır ve yeni bir 100 parçalık tablo başlar.

**Neden:** Duolingo tarzı düz çizgisel yollar "bitmeyen ödev" hissi verip kaygı yaratır. Puzzle'ın rastgele açılması hem merakı diri tutar hem koleksiyon yapma dürtüsünü besler. Puzzle %60-70'e geldiğinde ise "az kaldı, şu köşeyi de tamamlayayım" hissi devamlılık sağlar.

---

## 3. Seri

**Seri kategori başına tutulur.** Genel bir seri yoktur; kullanıcının "şiirde 12 gün, kelimede 4 gün" gibi ayrı serileri olur. Ana ekranda aktif kategorinin serisi görünür.

Bir kategorinin serisi, o gün o kategoride en az bir içerik tamamlanınca korunur. Yani seriyi ayakta tutan şey fincan harcamak değil, içeriği bitirmek.

### Sessiz tolerans

**Bir gün kaçırmak seriyi kırmaz, iki gün üst üste kaçırınca kırılır.** Kullanıcının biriktirmesi, harcaması ya da takip etmesi gereken bir hak yoktur; ekranda ayrı bir sayaç da görünmez. Amaç zihni suçluluktan korumak, ama bunu yönetilecek yeni bir şey eklemeden yapmak.

---

## Ekran Akışı

1. **Ana ekran (atölye masası / mantar pano):** Ortada aktif kategorinin 100 parçalı yapbozu, silüet halinde. Masanın üzerindeki objelere (daktilo, boya tüpü, pikap, parşömen) dokunarak kategori değiştirilir, tablo da onunla değişir. Üstte kalan fincanlar (☕☕) ve aktif kategorinin serisi (🔥 12).
2. **Kategoriye giriş:** "Günün Şiirini Keşfet" butonuna basılır, 1 fincan harcanır ve odak oturumu başlar.
3. **Oturum:** Rastgele bir içerik gelir. Kullanıcı okur, "Okudum" der. İsterse "yeni şiir" diyerek havuzdan bir sonraki rastgele içeriği alır.
4. **Ödül:** O kategori günün ilk kez tamamlandığında ekran yapboza döner ve yeni parça parlayarak yerine oturur.
5. **Çıkış:** Ana sayfaya dönüldüğünde oturum kapanır.

---

## Açık Sorular

- Kullanıcı kategori eklerse veya çıkarırsa fincan kapasitesi anında mı değişir? Dolu fincanken kategori silinirse ne olur?
- Fincan bittiğinde gösterilecek metin ne olacak?
- Havuzdaki 100 içerik bitince yeni havuz nasıl gelecek?
- Puzzle görseli hangi kaynaktan gelecek? (Telif için kamu malı müze arşivleri ya da özel illüstrasyon)
