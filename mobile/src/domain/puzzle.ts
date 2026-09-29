export const TILE_COUNT = 100;
export const GRID_SIZE = 10;

export type Board = {
  /** Kategorinin tablo listesinde kaçıncı tablo. */
  paintingIndex: number;
  /** Açılmış karoların indeksleri, açılış sırasıyla. */
  unlocked: number[];
  /** Son parçanın açıldığı gün; her tablo günde en fazla bir parça alır. */
  lastUnlockDay: string | null;
};

export function emptyBoard(paintingIndex = 0): Board {
  return { paintingIndex, unlocked: [], lastUnlockDay: null };
}

export function isComplete(board: Board): boolean {
  return board.unlocked.length >= TILE_COUNT;
}

/**
 * Günün ilk tamamlanmasında bir parça açar. Parça yalnızca kilitli karolar
 * arasından seçilir. Tamamlanmış tablonun ertesi parçası yeni tabloyu başlatır.
 * O gün zaten parça açıldıysa tile null döner ve tahta değişmez.
 */
export function unlockTile(
  board: Board,
  day: string,
  random: () => number = Math.random,
): { board: Board; tile: number | null } {
  if (board.lastUnlockDay === day) return { board, tile: null };
  const current = isComplete(board) ? emptyBoard(board.paintingIndex + 1) : board;
  const taken = new Set(current.unlocked);
  const locked: number[] = [];
  for (let i = 0; i < TILE_COUNT; i++) if (!taken.has(i)) locked.push(i);
  const tile = locked[Math.floor(random() * locked.length)];
  return {
    board: { ...current, unlocked: [...current.unlocked, tile], lastUnlockDay: day },
    tile,
  };
}
