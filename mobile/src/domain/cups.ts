import { MINUTE } from './time';

/** Fincan sayısı üst sınırın altına düştüğünde başlayan yenilenme süresi. */
export const COOLDOWN_MS = 180 * MINUTE;

export type Cups = {
  count: number;
  /** Aktif kategori sayısı kadar. */
  capacity: number;
  /** Devam eden 3 saatlik döngünün başladığı an; üst sınırdaysa null. */
  refillStartedAt: number | null;
};

export function fullCups(capacity: number): Cups {
  return { count: capacity, capacity, refillStartedAt: null };
}

/**
 * Geçen süreye göre dolan fincanları ekler. Döngüler zincirlenir: uygulama
 * 7 saat kapalı kaldıysa iki fincan dolar ve üçüncü döngü 1 saat ilerlemiş olur.
 */
export function settleCups(cups: Cups, now: number): Cups {
  let { count, refillStartedAt } = cups;
  const { capacity } = cups;
  if (count >= capacity) return { count: capacity, capacity, refillStartedAt: null };
  if (refillStartedAt === null) refillStartedAt = now;
  while (count < capacity && now - refillStartedAt >= COOLDOWN_MS) {
    count += 1;
    refillStartedAt += COOLDOWN_MS;
  }
  return { count, capacity, refillStartedAt: count >= capacity ? null : refillStartedAt };
}

/** Bir fincan harcar. Fincan yoksa null döner. */
export function spendCup(cups: Cups, now: number): Cups | null {
  const settled = settleCups(cups, now);
  if (settled.count <= 0) return null;
  return {
    count: settled.count - 1,
    capacity: settled.capacity,
    refillStartedAt: settled.refillStartedAt ?? now,
  };
}

/** Sıradaki fincanın dolmasına kalan süre; üst sınırdaysa null. */
export function msUntilNextCup(cups: Cups, now: number): number | null {
  const settled = settleCups(cups, now);
  if (settled.refillStartedAt === null) return null;
  return settled.refillStartedAt + COOLDOWN_MS - now;
}
