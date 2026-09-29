# UI ve Kütüphane Araştırması

Eylül 2026. Hedef: DEHB'li kullanıcıyı **çekmek ama yormamak**. Bu doküman hem tasarım kararlarını hem de mobil uygulamada kullanılacak kütüphaneleri gerekçeleriyle topluyor.

---

## 1. DEHB için UI ilkeleri

Araştırmalarda tekrar tekrar çıkan başlıklar ve bizim uygulamadaki karşılıkları:

| İlke | Neden | Uygulamada |
| --- | --- | --- |
| **Ekranda tek birincil eylem** | Karar felci DEHB'de başlamanın önündeki en büyük engel. | Her ekranda tek büyük buton: "Günün Şiirini Keşfet", "Okudum". İkincil eylemler küçük ve sessiz. |
| **Kademeli açılım** | Her şeyi aynı anda göstermek bunaltır. | İlk bakışta sadece eser. Künye ve bağlam, istenirse alttan açılan panelde. |
| **Az ama anlamlı hareket** | Gereksiz hareket dikkati dağıtır. Ödül anındaki hareket ise dopamini besler. | Hareket yalnızca ödül anlarında: parça açılır, sis dağılır. Sistemdeki "Hareketi Azalt" ayarı açıksa yalnızca yumuşak opaklık geçişi kalır. |
| **Anında geri bildirim** | DEHB'de düşük bazal dopamin, anlık ödüle güçlü tepki verir. | "Okudum"da hafif titreşim, parça açılınca başarı titreşimi. |
| **Değişken ödül, cezasız sistem** | Belirsiz ödül merakı canlı tutar. Kırılan seri kaygı ve bırakma üretir. | Rastgele içerik ve rastgele karo. Seride 1 günlük sessiz tolerans. Kırılma olursa suçlayıcı dil yok, açılan parçalar asla geri alınmaz. |
| **Okunabilirlik** | Göz satırı kaybettiğinde okuma kopar. | Satır uzunluğu en fazla ~65 karakter, geniş satır aralığı, bol boşluk. |
| **Otomatik oynatma ve pop-up yok** | Beklenmedik uyaran dikkati kırar. | Ses ve video kendiliğinden başlamaz. Şarkı Spotify'da, kullanıcı isterse açılır. |
| **Yetişkin estetiği** | Çocuksu arayüzler bu kitleyi uzaklaştırıyor. | Maskot yok. Kağıt, mürekkep, atölye masası. |

### Piyasadan dersler
- **Finch:** Tamamen cezasız, pozitif döngü. Kaygılı DEHB'li kullanıcıda iyi çalışıyor. Bizim sessiz toleransımız aynı fikirden geliyor.
- **Tiimo / Structured:** Görsel zaman çizelgesi, bloklar. Bizim geri sayımlı fincanlarımız da zamanı görünür kılıyor.
- **Duolingo:** Kısa oturum ve net seri iyi. Düz çizgisel yol ve kaybetme korkusu ise kaygı üretiyor. Biz yolu puzzle ile değiştirdik.

---

## 2. Tipografi

| Font | Güçlü yanı | Karar |
| --- | --- | --- |
| **Atkinson Hyperlegible Next** | Karakter ayırt edilebilirliği (I/l/1, rn/m). Türkçe karakter desteği var. | **UI metni** (butonlar, etiketler, sayılar) |
| **Literata** | Uzun okumaya göre tasarlanmış editoryal bir serif. | **İçerik** (şiir, kelime, kürasyon notu). "Atölye" estetiğini taşır. |
| Lexend | Okuma hızı araştırmalarında güçlü. | Estetik olarak fazla "eğitim uygulaması" gibi duruyor. İleride ayarlara alternatif font olarak eklenebilir. |
| Fraunces | Karakterli bir serif. | Başlıklarda denenebilir. Şimdilik Literata tek serif olarak yeterli. |

---

## 3. Renk

- Zemin kağıt ve krem tonlarında, metin mürekkep renginde. Saf beyaz ve saf siyah kullanılmıyor, çünkü ikisi de göz yoruyor.
- Her kategorinin tek bir sakin vurgu rengi var:
  - Şiir: mürekkep mavisi
  - Sanat: toprak kırmızısı
  - Şarkı: zeytin yeşili
  - Kelime: hardal
- Karanlık mod baştan tasarlandı: "gece atölyesi", sıcak koyu kahve tonları.
- Renklerin tamamı `mobile/src/theme/tokens.ts` dosyasında token olarak duruyor.

---

## 4. Kütüphaneler

Temel: **Expo SDK 57 + Expo Router.** Tek kod tabanı iOS, Android ve web'de çalışıyor. Geliştirme sırasında telefonda Expo Go ile anında test edilebiliyor.

| Alan | Seçim | Değerlendirilen alternatifler |
| --- | --- | --- |
| Animasyon | **react-native-reanimated 4**: animasyonlar UI thread'inde çalışıyor, `useReducedMotion` desteği var | Moti (Reanimated 4 ile artık gereksiz), RN Animated (yavaş) |
| Dokunma | **react-native-gesture-handler** | — |
| Titreşim | **expo-haptics**: Light impact ve Success notification. Web'de sessizce atlanıyor | — |
| Görsel | **expo-image**: önbellek ve yumuşak geçiş | RN Image |
| Puzzle sisi | **Reanimated + 10×10 View ızgarası** her platformda çalışıyor | **Skia** (GPU shader ile gerçek bulanık sis): daha güzel ama web'de yaklaşık 3MB WASM indiriyor. v2'de native için eklenecek |
| İllüstrasyon | **react-native-svg**: daktilo, boya tüpü, pikap, parşömen, fincan | PNG (ölçeklenmiyor, tema rengi alamıyor) |
| Mikro animasyon | **Rive** (v2): state machine ile fincanın dolması, objelerin "idle/pressed" hâlleri | Lottie: çizgisel animasyonda iyi, etkileşimli durumlarda zayıf |
| Durum | **Zustand + persist** | Redux (fazla tören), Jotai |
| Kalıcılık | Prototipte **AsyncStorage** (web'de localStorage). Native build'de **react-native-mmkv** | MMKV Expo Go'da çalışmıyor |
| Alt panel | Reanimated ile yazılmış **kendi hafif panelimiz** | @gorhom/bottom-sheet: güçlü ama Reanimated 4.5 ile uyumu belirsiz ve tek bir panel için ağır |
| Stil | **StyleSheet + kendi token'larımız** | NativeWind (Tailwind), Tamagui, Unistyles: ekran sayısı az ve estetik tamamen özel olduğu için hazır UI kiti fayda getirmiyor |

---

## Kaynaklar

- [The Principles of Neurodivergent UX Design](https://www.accessibilitychecker.org/blog/neurodivergent-ux-design/)
- [UI/UX and ADHD: Designing for Focus](https://www.designmonks.co/blog/ui-ux-and-adhd)
- [Designing for the Neurodivergent: Reducing Cognitive Load](https://asabharwal.com/designing-for-the-neurodivergent/)
- [Tiimo: Gamification and ADHD](https://www.tiimoapp.com/resource-hub/gamification-adhd)
- [Tiimo: ADHD and Dopamine](https://www.tiimoapp.com/resource-hub/adhd-and-dopamine)
- [ADHD Reward Systems for Adults](https://neurolaunch.com/adhd-reward-system-for-adults/)
- [Lexend vs Atkinson Hyperlegible](https://getnook.net/blog/lexend-vs-atkinson-hyperlegible)
- [The Best Fonts for ADHD](https://www.accessibilitychecker.org/blog/the-best-fonts-for-adhd/)
- [React Native Skia: Web Support](https://shopify.github.io/react-native-skia/docs/getting-started/web/)
- [Expo: Reanimated](https://docs.expo.dev/versions/latest/sdk/reanimated/)
- [Rive vs Lottie (2026)](https://unicornicons.com/learn/rive-vs-lottie)
- [Best React Native UI libraries in 2026](https://motionary.dev/blog/best-react-native-ui-libraries-2026)
- [NativeWind vs Tamagui vs Unistyles (2026)](https://medium.com/react-native-journal/nativewind-vs-tamagui-vs-unistyles-which-styling-library-should-you-use-in-2026-cf4f4d78b76f)
- [MMKV vs AsyncStorage (2026)](https://www.pkgpulse.com/guides/react-native-mmkv-vs-async-storage-vs-expo-secure-store-2026)
