export type Song = {
  id: string;
  title: string;
  artist: string;
  /** Spotify'da arama derin bağlantısı; parça ID'leri netleşince doğrudan parça linkine çevrilecek. */
  query: string;
  note: string;
};

export function spotifyUrl(song: Song): string {
  return `https://open.spotify.com/search/${encodeURIComponent(song.query)}`;
}

export const SONGS: Song[] = [
  {
    id: 'satie-gymnopedie',
    title: 'Gymnopédie No. 1',
    artist: 'Erik Satie',
    query: 'Gymnopédie No. 1 Satie',
    note: 'Satie bu parçayı yavaş ve acılı bir şekilde çalınsın diye yazdı. Az notayla çok boşluk bırakıyor, dinlerken nefesin yavaşlıyor.',
  },
  {
    id: 'evans-peace',
    title: 'Peace Piece',
    artist: 'Bill Evans',
    query: 'Peace Piece Bill Evans',
    note: 'Sol el baştan sona aynı iki akoru tekrarlıyor, sağ el ise bunun üzerinde serbestçe dolaşıyor. Doğaçlama bir meditasyon.',
  },
  {
    id: 'manco-gulpembe',
    title: 'Gülpembe',
    artist: 'Barış Manço',
    query: 'Gülpembe Barış Manço',
    note: 'Barış Manço bu şarkıyı anneannesi için yazdı. Bir veda şarkısı ama hüzünden çok sevgi kalıyor.',
  },
  {
    id: 'debussy-clair',
    title: 'Clair de Lune',
    artist: 'Claude Debussy',
    query: 'Clair de Lune Debussy',
    note: 'Adını Paul Verlaine\'in aynı adlı şiirinden alıyor. Ay ışığını notalarla anlatma denemesi.',
  },
  {
    id: 'simone-feeling',
    title: 'Feeling Good',
    artist: 'Nina Simone',
    query: 'Feeling Good Nina Simone',
    note: 'Şarkı neredeyse çıplak bir sesle başlıyor, orkestra ancak sonra giriyor. Yeni bir günün, yeni bir başlangıcın şarkısı.',
  },
  {
    id: 'karaca-tamirci',
    title: 'Tamirci Çırağı',
    artist: 'Cem Karaca',
    query: 'Tamirci Çırağı Cem Karaca',
    note: 'Bir tamirci çırağının gözünden anlatılan, çaresiz bir aşk hikâyesi. Anadolu rock\'ın en çok anlatılan şarkılarından.',
  },
  {
    id: 'drake-pink-moon',
    title: 'Pink Moon',
    artist: 'Nick Drake',
    query: 'Pink Moon Nick Drake',
    note: 'Bir gitar, bir ses ve kısa bir piyano cümlesi. İki dakikadan biraz uzun; bu uygulama için biçilmiş kaftan.',
  },
  {
    id: 'ertas-gonul',
    title: 'Gönül Dağı',
    artist: 'Neşet Ertaş',
    query: 'Gönül Dağı Neşet Ertaş',
    note: 'Bozkırın sesi. Bağlama ve sesin bu kadar yalın bir araya geldiği az kayıt var.',
  },
];
