import { daysBetween } from './time';

export type Streak = {
  count: number;
  /** Son tamamlanan gün. */
  lastDay: string | null;
};

export const emptyStreak: Streak = { count: 0, lastDay: null };

/**
 * Sessiz tolerans: bir gün kaçırmak seriyi kırmaz (fark 2),
 * iki gün üst üste kaçırmak kırar (fark 3 ve üstü).
 */
const MAX_GAP = 2;

export function recordDay(streak: Streak, day: string): Streak {
  if (streak.lastDay === day) return streak;
  const alive = streak.lastDay !== null && daysBetween(streak.lastDay, day) <= MAX_GAP;
  return { count: alive ? streak.count + 1 : 1, lastDay: day };
}

/** Ekranda gösterilecek seri. Kırılmışsa 0. */
export function currentStreak(streak: Streak, today: string): number {
  if (streak.lastDay === null) return 0;
  return daysBetween(streak.lastDay, today) <= MAX_GAP ? streak.count : 0;
}
