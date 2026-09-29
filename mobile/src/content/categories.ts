export type CategoryId = 'siir' | 'sanat' | 'sarki' | 'kelime';

export type Category = {
  id: CategoryId;
  /** Masadaki obje. */
  object: string;
  label: string;
  cta: string;
  /** Tamamlama butonu. */
  done: string;
  next: string;
};

export const CATEGORIES: Category[] = [
  { id: 'siir', object: 'Daktilo', label: 'Şiir', cta: 'Günün Şiirini Keşfet', done: 'Okudum', next: 'Yeni şiir' },
  { id: 'sanat', object: 'Boya tüpü', label: 'Sanat', cta: 'Günün Eserini Keşfet', done: 'İnceledim', next: 'Yeni eser' },
  { id: 'sarki', object: 'Pikap', label: 'Şarkı', cta: 'Günün Şarkısını Keşfet', done: 'Dinledim', next: 'Yeni şarkı' },
  { id: 'kelime', object: 'Parşömen', label: 'Kelime', cta: 'Günün Kelimesini Keşfet', done: 'Öğrendim', next: 'Yeni kelime' },
];

export const CATEGORY_BY_ID = Object.fromEntries(CATEGORIES.map((c) => [c.id, c])) as Record<
  CategoryId,
  Category
>;

export function isCategoryId(v: unknown): v is CategoryId {
  return typeof v === 'string' && v in CATEGORY_BY_ID;
}
