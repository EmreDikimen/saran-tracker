/**
 * Kamu malı şiirler (şairin ölümünün üzerinden 70 yıl geçmiş).
 * Uzun şiirlerden yalnızca kesit alınır. Yayından önce metinler basılı kaynaktan doğrulanmalı.
 */
export type Poem = {
  id: string;
  title: string;
  author: string;
  years: string;
  text: string;
  note: string;
};

export const POEMS: Poem[] = [
  {
    id: 'yunus-daglar',
    title: 'Dağlar ile Taşlar ile',
    author: 'Yunus Emre',
    years: '1240–1321',
    text: 'Dağlar ile taşlar ile\nÇağırayım Mevlam seni\nSeherlerde kuşlar ile\nÇağırayım Mevlam seni',
    note: 'Yunus, Tanrı\'yı bir mabette değil, dağda, taşta ve sabah kuşlarında arıyor. Yedi yüz yıllık bir dize ama dili bugün yazılmış kadar yalın.',
  },
  {
    id: 'yunus-gelin',
    title: 'Gelin Tanış Olalım',
    author: 'Yunus Emre',
    years: '1240–1321',
    text: 'Gelin tanış olalım\nİşi kolay kılalım\nSevelim sevilelim\nDünya kimseye kalmaz',
    note: 'Dört dizede koca bir hayat felsefesi: işi zorlaştırma, sev. Son dize bir tehdit değil, bir rahatlama.',
  },
  {
    id: 'pir-sultan',
    title: 'Demedim mi',
    author: 'Pir Sultan Abdal',
    years: '16. yüzyıl',
    text: 'Güzel âşık cevrimizi\nÇekemezsin demedim mi\nBu bir rıza lokmasıdır\nYiyemezsin demedim mi',
    note: 'Her dörtlük aynı soruyla kapanıyor: "demedim mi?" Tekrar burada bir ritim; şiiri okumaktan çok dinliyormuş gibi hissettiriyor.',
  },
  {
    id: 'hasim-merdiven',
    title: 'Merdiven',
    author: 'Ahmet Haşim',
    years: '1884–1933',
    text: 'Ağır ağır çıkacaksın bu merdivenlerden,\nEteklerinde güneş rengi bir yığın yaprak,\nVe bir zaman bakacaksın semâya ağlayarak...',
    note: 'Haşim için şiir bir anlam değil, bir ruh hâli. Burada basamaklar yaşın, güneş rengi yapraklar da akşamın ve sonbaharın simgesi.',
  },
  {
    id: 'orhan-istanbul',
    title: 'İstanbul\'u Dinliyorum',
    author: 'Orhan Veli Kanık',
    years: '1914–1950',
    text: 'İstanbul\'u dinliyorum, gözlerim kapalı;\nÖnce hafiften bir rüzgâr esiyor;\nYavaş yavaş sallanıyor\nYapraklar, ağaçlarda;',
    note: 'Şiir bir şehri görmeden, yalnızca dinleyerek anlatıyor. Okurken gözlerini kapatmayı dene.',
  },
  {
    id: 'orhan-anlatamiyorum',
    title: 'Anlatamıyorum',
    author: 'Orhan Veli Kanık',
    years: '1914–1950',
    text: 'Ağlasam sesimi duyar mısınız,\nMısralarımda;\nDokunabilir misiniz,\nGözyaşlarıma, ellerinizle?',
    note: 'Şairin kendi aracından, yani kelimeden şüphe ettiği bir şiir. Soru işaretleri cevap beklemiyor, yalnızca kalıyor.',
  },
  {
    id: 'orhan-kitabe',
    title: 'Kitâbe-i Seng-i Mezar',
    author: 'Orhan Veli Kanık',
    years: '1914–1950',
    text: 'Hiçbir şeyden çekmedi dünyada\nNasır ağrısından çektiği kadar;\nKötü yaratılmış olmaktan da\nUtanmazdı kundura giydiği zaman.',
    note: 'Süleyman Efendi\'ye yazılmış bir mezar taşı. Garip akımı büyük kahramanlar yerine sıradan insanı ve onun nasırını şiire soktu.',
  },
];
