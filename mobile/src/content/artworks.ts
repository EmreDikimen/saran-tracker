import type { ImageSourcePropType } from 'react-native';

import type { CategoryId } from './categories';

/**
 * Art Institute of Chicago açık erişim koleksiyonu (CC0).
 * Görseller assets/art/ altında, dosya adı AIC eser numarası.
 */
export type Artwork = {
  id: string;
  title: string;
  artist: string;
  date: string;
  image: ImageSourcePropType;
  /** Genişlik / yükseklik. */
  ratio: number;
  note: string;
};

export const ARTWORKS: Artwork[] = [
  {
    id: 'aic-14655',
    title: 'İki Kız Kardeş (Terasta)',
    artist: 'Pierre-Auguste Renoir',
    date: '1881',
    image: require('@/assets/art/14655.jpg'),
    ratio: 843 / 1046,
    note: 'Renoir bu tabloyu Seine kıyısındaki Chatou\'da, bir restoranın terasında yaptı. Adına rağmen modeller kardeş değildi.',
  },
  {
    id: 'aic-111442',
    title: 'Çocuğun Banyosu',
    artist: 'Mary Cassatt',
    date: '1893',
    image: require('@/assets/art/111442.jpg'),
    ratio: 843 / 1279,
    note: 'Yukarıdan bakan açı ve desenli yüzeyler Japon baskılarından geliyor. Cassatt sıradan bir anı, bir tören gibi resmediyor.',
  },
  {
    id: 'aic-80607',
    title: 'Otoportre',
    artist: 'Vincent van Gogh',
    date: '1887',
    image: require('@/assets/art/80607.jpg'),
    ratio: 843 / 1074,
    note: 'Van Gogh Paris\'teyken model tutacak parası olmadığı için kendini defalarca resmetti. Buradaki küçük, noktasal fırça darbeleri Seurat\'nın etkisi.',
  },
  {
    id: 'aic-24645',
    title: 'Kanagawa Açıklarında Büyük Dalga',
    artist: 'Katsushika Hokusai',
    date: '1830–33',
    image: require('@/assets/art/24645.jpg'),
    ratio: 843 / 578,
    note: 'Dalganın altında, en arkada küçücük bir Fuji Dağı var; bulabildin mi? Bu bir ağaç baskı, yani binlerce kopyası basıldı.',
  },
  {
    id: 'aic-64818',
    title: 'Buğday Yığınları (Yaz Sonu)',
    artist: 'Claude Monet',
    date: '1890–91',
    image: require('@/assets/art/64818.jpg'),
    ratio: 843 / 498,
    note: 'Monet aynı buğday yığınlarını farklı saatlerde ve mevsimlerde onlarca kez resmetti. Asıl konu yığınlar değil, üzerlerine düşen ışık.',
  },
  {
    id: 'aic-20684',
    title: 'Paris Sokağı; Yağmurlu Gün',
    artist: 'Gustave Caillebotte',
    date: '1877',
    image: require('@/assets/art/20684.jpg'),
    ratio: 843 / 655,
    note: 'Yeni açılmış geniş bulvarlar, şemsiyeler, birbirine bakmayan insanlar. Modern şehir hayatının ilk portrelerinden biri.',
  },
  {
    id: 'aic-28560',
    title: 'Yatak Odası',
    artist: 'Vincent van Gogh',
    date: '1889',
    image: require('@/assets/art/28560.jpg'),
    ratio: 843 / 660,
    note: 'Van Gogh Arles\'daki odasını üç kez resmetti; bu ikinci versiyon. Kardeşine yazdığına göre amacı bakana dinlenme hissi vermekti.',
  },
];

export type Painting = { title: string; artist: string; date: string; image: ImageSourcePropType };

const WATER_LILIES: Painting = {
  title: 'Nilüferler',
  artist: 'Claude Monet',
  date: '1906',
  image: require('@/assets/art/16568.jpg'),
};
const GRANDE_JATTE: Painting = {
  title: 'La Grande Jatte Adası\'nda Bir Pazar',
  artist: 'Georges Seurat',
  date: '1884–86',
  image: require('@/assets/art/27992.jpg'),
};
const MOULIN_ROUGE: Painting = {
  title: 'Moulin Rouge\'da',
  artist: 'Henri de Toulouse-Lautrec',
  date: '1892–95',
  image: require('@/assets/art/61128.jpg'),
};
const SAINT_LAZARE: Painting = {
  title: 'Normandiya Treninin Gelişi, Saint-Lazare Garı',
  artist: 'Claude Monet',
  date: '1877',
  image: require('@/assets/art/16571.jpg'),
};

const asPainting = (a: Artwork): Painting => ({ title: a.title, artist: a.artist, date: a.date, image: a.image });
const byId = (id: string) => asPainting(ARTWORKS.find((a) => a.id === id)!);

/** Her kategorinin sırayla dolacak gizli tabloları. */
export const BOARD_PAINTINGS: Record<CategoryId, Painting[]> = {
  siir: [WATER_LILIES, byId('aic-24645')],
  sanat: [GRANDE_JATTE, byId('aic-64818')],
  sarki: [MOULIN_ROUGE, byId('aic-20684')],
  kelime: [SAINT_LAZARE, byId('aic-28560')],
};

export function boardPainting(category: CategoryId, index: number): Painting {
  const list = BOARD_PAINTINGS[category];
  return list[index % list.length];
}
