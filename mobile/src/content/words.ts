export type Word = {
  id: string;
  word: string;
  language: string;
  meaning: string;
  note: string;
};

export const WORDS: Word[] = [
  {
    id: 'huzun',
    word: 'hüzün',
    language: 'Türkçe',
    meaning: 'Kederden daha yumuşak, bir şehrin ve bir topluluğun paylaştığı sessiz melankoli.',
    note: 'Orhan Pamuk İstanbul\'u anlatırken bu kelimeyi bir şehrin ruh hâli olarak kullanır. Tek kişinin değil, herkesin taşıdığı bir duygu.',
  },
  {
    id: 'yakamoz',
    word: 'yakamoz',
    language: 'Türkçe',
    meaning: 'Geceleri denizde, ay ışığının ya da ışıldayan canlıların suda yarattığı parıltı.',
    note: 'Birçok dilde tek bir karşılığı yok. Türkçe\'nin en sevilen kelimeleri listelerinde sıkça ilk sırada çıkar.',
  },
  {
    id: 'gurbet',
    word: 'gurbet',
    language: 'Türkçe',
    meaning: 'Doğup büyüdüğün yerden uzakta olmak ve bunun yarattığı yalnızlık.',
    note: 'Yalnızca bir yer değil, bir hâl. Türküler bu kelimenin etrafında bir tür kurar.',
  },
  {
    id: 'saudade',
    word: 'saudade',
    language: 'Portekizce',
    meaning: 'Belki hiç geri gelmeyecek bir şeye ya da birine duyulan derin, tatlı-acı özlem.',
    note: 'Fado müziğinin kalbindeki duygu. Özlenen şeyin yokluğu kadar, onu bir zaman sevmiş olmanın sıcaklığını da taşır.',
  },
  {
    id: 'komorebi',
    word: 'komorebi',
    language: 'Japonca',
    meaning: 'Ağaç yapraklarının arasından süzülen güneş ışığı.',
    note: 'Kelime üç parçadan oluşur: ağaç, arasından geçmek ve güneş. Bir dahaki yürüyüşte yukarı bakmak için bir bahane.',
  },
  {
    id: 'hygge',
    word: 'hygge',
    language: 'Danca',
    meaning: 'Sıcak, sakin ve güvende hissettiren bir anın rahatlığı; mum, battaniye, yakın dostlar.',
    note: 'Uzun ve karanlık kuzey kışlarında bir yaşam biçimine dönüşmüş. Bir eşya değil, bir atmosfer.',
  },
  {
    id: 'mangata',
    word: 'mångata',
    language: 'İsveççe',
    meaning: 'Ayın suyun üzerinde bıraktığı, yol gibi uzanan ışık izi.',
    note: 'Harfiyen "ay yolu" demek. Yakamoz ile akraba ama daha tek ve düz bir çizgi.',
  },
  {
    id: 'sobremesa',
    word: 'sobremesa',
    language: 'İspanyolca',
    meaning: 'Yemek bittikten sonra masadan kalkmadan sürdürülen sohbet.',
    note: 'Tabaklar boşaldı ama kimse acele etmiyor. Asıl yemeğin bu olduğunu söyleyenler de var.',
  },
];
