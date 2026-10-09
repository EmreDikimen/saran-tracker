import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

/**
 * Şiir arşivi: telif süresi dolmuş (şairi 1955 ve öncesinde ölmüş) 500 şiir.
 * Metinler Vikikaynak'tan alındı; JSON'lar public/veri/siirler altında durur ve
 * ana pakete girmez, ekran açılınca indirilir.
 */
export type PoetSummary = {
  slug: string;
  name: string;
  years: string;
  era: string;
  count: number;
};

export type ArchivePoem = {
  id: string;
  title: string;
  text: string;
  /** Vikikaynak'taki kaynak sayfa. */
  source: string;
};

export type PoetIndex = { eras: string[]; total: number; poets: PoetSummary[] };
export type PoetFile = Omit<PoetSummary, 'count'> & { poems: ArchivePoem[] };

// Web'de site /saran-tracker/ altında yayınlandığı için yol baseUrl ile başlar.
// Uygulamada yerel sunucu olmadığından yayındaki kopya okunur.
const PAGES_ORIGIN = 'https://emredikimen.github.io/saran-tracker';
const base =
  Platform.OS === 'web' ? (Constants.expoConfig?.experiments?.baseUrl ?? '') : PAGES_ORIGIN;

const cache = new Map<string, Promise<unknown>>();

function load<T>(path: string): Promise<T> {
  let p = cache.get(path);
  if (!p) {
    p = fetch(`${base}/veri/siirler/${path}`).then((r) => {
      if (!r.ok) throw new Error(`${path}: ${r.status}`);
      return r.json();
    });
    // Hata kalıcı olmasın; bir sonraki denemede yeniden istenir.
    p.catch(() => cache.delete(path));
    cache.set(path, p);
  }
  return p as Promise<T>;
}

type Loaded<T> = { data: T | undefined; error: boolean };

function useLoad<T>(path: string | undefined): Loaded<T> {
  const [state, setState] = useState<Loaded<T> & { path?: string }>({ data: undefined, error: false });
  useEffect(() => {
    if (!path) return;
    let alive = true;
    load<T>(path).then(
      (data) => alive && setState({ data, error: false, path }),
      () => alive && setState({ data: undefined, error: true, path }),
    );
    return () => {
      alive = false;
    };
  }, [path]);
  if (!path) return { data: undefined, error: true };
  // Yol değiştiyse eski şairin verisi bir an bile görünmesin.
  return state.path === path ? state : { data: undefined, error: false };
}

export const usePoetIndex = () => useLoad<PoetIndex>('index.json');

export const usePoet = (slug: string | undefined) =>
  useLoad<PoetFile>(slug && /^[a-z0-9-]+$/.test(slug) ? `${slug}.json` : undefined);

/** Arama için: büyük/küçük harf ve şapka farkını yok sayar. */
export function foldTr(s: string): string {
  return s
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/ı/g, 'i');
}
