import { useColorScheme } from 'react-native';

import type { CategoryId } from '@/content/categories';

type Palette = {
  paper: string;
  /** Masa yüzeyi, kartlar. */
  desk: string;
  surface: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  line: string;
  /** Kilitli karoların sisi. */
  fog: string;
  glow: string;
  /** Dolu fincan. */
  coffee: string;
  accent: Record<CategoryId, string>;
  accentSoft: Record<CategoryId, string>;
};

const light: Palette = {
  paper: '#F4EFE6',
  desk: '#EAE2D3',
  surface: '#FBF8F2',
  ink: '#2B2620',
  inkSoft: '#5E554A',
  inkFaint: '#9A8F80',
  line: '#D9CFBE',
  fog: '#E7DFD0',
  glow: '#F2C66D',
  coffee: '#7A5234',
  accent: { siir: '#34507A', sanat: '#A5503A', sarki: '#5E6B3A', kelime: '#9A7420' },
  accentSoft: { siir: '#DCE2EC', sanat: '#F0DDD5', sarki: '#E1E4D3', kelime: '#F1E5C6' },
};

const dark: Palette = {
  paper: '#1E1A16',
  desk: '#27221C',
  surface: '#2E2821',
  ink: '#EDE5D8',
  inkSoft: '#BFB4A4',
  inkFaint: '#857A6C',
  line: '#3D352C',
  fog: '#2A241E',
  glow: '#E8B75A',
  coffee: '#C9976A',
  accent: { siir: '#8FA8CF', sanat: '#D98A73', sarki: '#A9B77E', kelime: '#D9B25C' },
  accentSoft: { siir: '#2C3340', sanat: '#3E2C25', sarki: '#30331F', kelime: '#3B3220' },
};

export type Theme = { dark: boolean; c: Palette };

export function useTheme(): Theme {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return { dark: isDark, c: isDark ? dark : light };
}

export const fonts = {
  ui: 'AtkinsonHyperlegibleNext_400Regular',
  uiMedium: 'AtkinsonHyperlegibleNext_500Medium',
  uiBold: 'AtkinsonHyperlegibleNext_700Bold',
  serif: 'Literata_400Regular',
  serifItalic: 'Literata_400Regular_Italic',
  serifMedium: 'Literata_500Medium',
  serifSemi: 'Literata_600SemiBold',
};

export const space = { xs: 4, s: 8, m: 16, l: 24, xl: 32, xxl: 48 };
export const radius = { s: 8, m: 14, l: 22, pill: 999 };

/** Okuma sütununun en geniş hâli (~65 karakter). */
export const READING_WIDTH = 520;
