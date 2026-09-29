import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { CATEGORIES, type CategoryId } from '@/content/categories';
import { pickRandom } from '@/content';
import { fullCups, spendCup, type Cups } from '@/domain/cups';
import { emptyBoard, TILE_COUNT, unlockTile, type Board } from '@/domain/puzzle';
import { emptyStreak, recordDay, type Streak } from '@/domain/streak';
import { dayKey } from '@/domain/time';

export type Session = { category: CategoryId; itemId: string };

/** Günün ilk tamamlanmasında açılan parça; ödül ekranı bunu oynatır. */
export type Reveal = { category: CategoryId; tile: number; paintingIndex: number };

const ids = CATEGORIES.map((c) => c.id);
const perCategory = <T>(make: () => T) =>
  Object.fromEntries(ids.map((id) => [id, make()])) as Record<CategoryId, T>;

type Data = {
  /** Dev panelin zamanı ileri sarması için; gerçek kullanımda 0. */
  timeOffset: number;
  cups: Cups;
  active: CategoryId;
  session: Session | null;
  boards: Record<CategoryId, Board>;
  streaks: Record<CategoryId, Streak>;
  seen: Record<CategoryId, string[]>;
  /** "kategori:id" anahtarları. */
  favorites: string[];
  reveal: Reveal | null;
};

type Actions = {
  now: () => number;
  setActive: (c: CategoryId) => void;
  /** Bir fincan harcayıp oturum açar. Fincan yoksa false. */
  startSession: (c: CategoryId) => boolean;
  nextItem: () => void;
  /** İçeriği tamamlar. Günün ilk tamamlanmasıysa parça açar ve true döner. */
  complete: () => boolean;
  endSession: () => void;
  clearReveal: () => void;
  toggleFavorite: (key: string) => void;
  dev: {
    advance: (ms: number) => void;
    reset: () => void;
    fillBoard: (c: CategoryId, tiles: number) => void;
  };
};

const initial = (): Data => ({
  timeOffset: 0,
  cups: fullCups(ids.length),
  active: 'siir',
  session: null,
  boards: perCategory(() => emptyBoard()),
  streaks: perCategory(() => emptyStreak),
  seen: perCategory(() => [] as string[]),
  favorites: [],
  reveal: null,
});

export const useAppStore = create<Data & Actions>()(
  persist(
    (set, get) => ({
      ...initial(),

      now: () => Date.now() + get().timeOffset,

      setActive: (active) => set({ active }),

      startSession: (category) => {
        const s = get();
        if (s.session?.category === category) return true;
        const cups = spendCup(s.cups, s.now());
        if (!cups) return false;
        const pick = pickRandom(category, s.seen[category], null);
        set({
          cups,
          active: category,
          session: { category, itemId: pick.id },
          seen: { ...s.seen, [category]: pick.seen },
        });
        return true;
      },

      nextItem: () => {
        const s = get();
        if (!s.session) return;
        const { category, itemId } = s.session;
        const pick = pickRandom(category, s.seen[category], itemId);
        set({ session: { category, itemId: pick.id }, seen: { ...s.seen, [category]: pick.seen } });
      },

      complete: () => {
        const s = get();
        if (!s.session) return false;
        const { category } = s.session;
        const today = dayKey(s.now());
        const streak = recordDay(s.streaks[category], today);
        const { board, tile } = unlockTile(s.boards[category], today);
        set({
          streaks: { ...s.streaks, [category]: streak },
          boards: { ...s.boards, [category]: board },
          reveal: tile === null ? s.reveal : { category, tile, paintingIndex: board.paintingIndex },
        });
        return tile !== null;
      },

      endSession: () => {
        if (get().session) set({ session: null });
      },

      clearReveal: () => set({ reveal: null }),

      toggleFavorite: (key) => {
        const favs = get().favorites;
        set({ favorites: favs.includes(key) ? favs.filter((f) => f !== key) : [...favs, key] });
      },

      dev: {
        advance: (ms) => set({ timeOffset: get().timeOffset + ms }),
        reset: () => set(initial()),
        fillBoard: (category, tiles) => {
          const board = get().boards[category];
          const unlocked = [...Array(TILE_COUNT).keys()]
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.min(tiles, TILE_COUNT));
          set({
            boards: { ...get().boards, [category]: { ...board, unlocked, lastUnlockDay: null } },
          });
        },
      },
    }),
    {
      name: 'saran-tracker',
      version: 1,
      // Fonksiyonlar JSON'a yazılmaz; geri yüklemede mevcut aksiyonlar korunur.
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export const favoriteKey = (category: CategoryId, id: string) => `${category}:${id}`;
