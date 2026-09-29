import { describe, expect, it } from '@jest/globals';

import { COOLDOWN_MS, fullCups, msUntilNextCup, settleCups, spendCup } from '../cups';
import { emptyBoard, TILE_COUNT, unlockTile } from '../puzzle';
import { currentStreak, emptyStreak, recordDay } from '../streak';
import { formatCountdown, HOUR, MINUTE } from '../time';

const T0 = new Date(2026, 8, 29, 9, 0).getTime();

describe('fincanlar', () => {
  it('harcayınca 180 dk sonra bir fincan döner', () => {
    const spent = spendCup(fullCups(4), T0)!;
    expect(spent.count).toBe(3);
    expect(settleCups(spent, T0 + COOLDOWN_MS - 1).count).toBe(3);
    expect(settleCups(spent, T0 + COOLDOWN_MS).count).toBe(4);
  });

  it('döngüler zincirlenir ve üst sınırda sayaç durur', () => {
    let c = fullCups(3);
    c = spendCup(c, T0)!;
    c = spendCup(c, T0 + HOUR)!; // sayaç yeniden başlamaz, T0'dan sayar
    c = spendCup(c, T0 + 2 * HOUR)!;
    expect(c.count).toBe(0);
    expect(msUntilNextCup(c, T0 + 2 * HOUR)).toBe(HOUR);
    const later = settleCups(c, T0 + 7 * HOUR);
    expect(later.count).toBe(2);
    expect(msUntilNextCup(later, T0 + 7 * HOUR)).toBe(2 * HOUR);
    const full = settleCups(c, T0 + 30 * HOUR);
    expect(full).toEqual({ count: 3, capacity: 3, refillStartedAt: null });
    expect(msUntilNextCup(full, T0 + 30 * HOUR)).toBeNull();
  });

  it('fincan yoksa harcanamaz', () => {
    expect(spendCup({ count: 0, capacity: 2, refillStartedAt: T0 }, T0 + MINUTE)).toBeNull();
  });

  it('geri sayım formatı', () => {
    expect(formatCountdown(2 * HOUR + 14 * MINUTE)).toBe('02:14');
    expect(formatCountdown(30 * 1000)).toBe('00:01');
    expect(formatCountdown(179.9 * MINUTE)).toBe('02:59');
  });
});

describe('puzzle', () => {
  it('100 günde tekrarsız tamamlanır', () => {
    let board = emptyBoard();
    for (let d = 0; d < TILE_COUNT; d++) {
      const r = unlockTile(board, `day-${d}`);
      expect(r.tile).not.toBeNull();
      board = r.board;
    }
    expect(new Set(board.unlocked).size).toBe(TILE_COUNT);
  });

  it('aynı gün ikinci parça açılmaz', () => {
    const first = unlockTile(emptyBoard(), '2026-09-29');
    const second = unlockTile(first.board, '2026-09-29');
    expect(second.tile).toBeNull();
    expect(second.board.unlocked).toHaveLength(1);
  });

  it('tamamlanan tablodan sonra yeni tablo başlar', () => {
    const full = { paintingIndex: 0, unlocked: [...Array(TILE_COUNT).keys()], lastUnlockDay: 'x' };
    const r = unlockTile(full, 'y');
    expect(r.board.paintingIndex).toBe(1);
    expect(r.board.unlocked).toHaveLength(1);
  });
});

describe('seri', () => {
  it('ardışık günler seriyi büyütür, aynı gün saymaz', () => {
    let s = recordDay(emptyStreak, '2026-09-01');
    s = recordDay(s, '2026-09-01');
    s = recordDay(s, '2026-09-02');
    expect(s.count).toBe(2);
  });

  it('bir gün kaçırmak kırmaz, iki gün kırar', () => {
    const s = recordDay(recordDay(emptyStreak, '2026-09-01'), '2026-09-03');
    expect(s.count).toBe(2);
    expect(currentStreak(s, '2026-09-05')).toBe(2);
    expect(currentStreak(s, '2026-09-06')).toBe(0);
    expect(recordDay(s, '2026-09-06').count).toBe(1);
  });

  it('ay sınırını doğru sayar', () => {
    const s = recordDay(recordDay(emptyStreak, '2026-09-30'), '2026-10-01');
    expect(s.count).toBe(2);
  });
});
