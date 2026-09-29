import { ARTWORKS, type Artwork } from './artworks';
import type { CategoryId } from './categories';
import { POEMS, type Poem } from './poems';
import { SONGS, type Song } from './songs';
import { WORDS, type Word } from './words';

export type ContentItem =
  | ({ kind: 'siir' } & Poem)
  | ({ kind: 'sanat' } & Artwork)
  | ({ kind: 'sarki' } & Song)
  | ({ kind: 'kelime' } & Word);

export const POOLS: Record<CategoryId, ContentItem[]> = {
  siir: POEMS.map((p) => ({ kind: 'siir' as const, ...p })),
  sanat: ARTWORKS.map((a) => ({ kind: 'sanat' as const, ...a })),
  sarki: SONGS.map((s) => ({ kind: 'sarki' as const, ...s })),
  kelime: WORDS.map((w) => ({ kind: 'kelime' as const, ...w })),
};

export function findItem(category: CategoryId, id: string): ContentItem | undefined {
  return POOLS[category].find((i) => i.id === id);
}

/** Kartlarda ve arşivde gösterilecek kısa başlık. */
export function itemTitle(item: ContentItem): { title: string; by: string } {
  switch (item.kind) {
    case 'siir':
      return { title: item.title, by: item.author };
    case 'sanat':
      return { title: item.title, by: item.artist };
    case 'sarki':
      return { title: item.title, by: item.artist };
    case 'kelime':
      return { title: item.word, by: item.language };
  }
}

/**
 * Havuzdan rastgele, görülmemiş bir içerik seçer. Havuz tükenince
 * görülenler sıfırlanır (az önce gösterilen hariç).
 */
export function pickRandom(
  category: CategoryId,
  seen: string[],
  exclude: string | null,
  random: () => number = Math.random,
): { id: string; seen: string[] } {
  const pool = POOLS[category].map((i) => i.id);
  let fresh = pool.filter((id) => !seen.includes(id) && id !== exclude);
  let nextSeen = seen;
  if (fresh.length === 0) {
    fresh = pool.filter((id) => id !== exclude);
    nextSeen = [];
  }
  const id = fresh[Math.floor(random() * fresh.length)];
  return { id, seen: [...nextSeen, id] };
}
