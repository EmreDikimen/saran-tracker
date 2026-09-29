export const MINUTE = 60 * 1000;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

/** Yerel saate göre gün anahtarı: "2026-09-29". */
export function dayKey(ts: number): string {
  const d = new Date(ts);
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** İki gün anahtarı arasındaki takvim günü farkı (b - a). */
export function daysBetween(a: string, b: string): number {
  const toUtc = (k: string) => {
    const [y, m, d] = k.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(b) - toUtc(a)) / DAY);
}

/** 8040000 → "02:14" (saat:dakika). Son dakikada "00:01" gösterilir, "00:00" değil. */
export function formatCountdown(ms: number): string {
  const totalMin = ms > 0 ? Math.max(1, Math.floor(ms / MINUTE)) : 0;
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
