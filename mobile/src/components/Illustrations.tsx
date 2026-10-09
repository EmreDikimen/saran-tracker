import { Image } from 'expo-image';
import Svg, { Circle, Ellipse, G, Rect } from 'react-native-svg';

const CUP_FULL = require('@/assets/objects/cup_full.png');
const CUP_EMPTY = require('@/assets/objects/cup_empty.png');

/**
 * Kahve fincanı (tasarim/coffee_icon.jpeg). Dolu fincan latteli çizimin kendisi;
 * boşunun kahvesi alınmış ve soluk durur, 3 saatte bir yeniden dolar.
 */
export function CupIcon({ full, size = 30 }: { full: boolean; size?: number }) {
  return (
    <Image
      source={full ? CUP_FULL : CUP_EMPTY}
      style={{ width: size, height: size, opacity: full ? 1 : 0.55 }}
      contentFit="contain"
      transition={250}
      accessibilityIgnoresInvertColors
    />
  );
}

/** Kelime objesi; kendi görseli gelene kadar. Ortası seri sayısı için boş bırakıldı. */
export function ScrollIllustration({
  size,
  stroke,
  fill,
  paper,
}: {
  size: number;
  stroke: string;
  fill: string;
  paper: string;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <G stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
        <Rect x={15} y={13} width={34} height={38} fill={paper} />
        <Rect x={10} y={8} width={44} height={8} rx={4} fill={fill} />
        <Rect x={10} y={48} width={44} height={8} rx={4} fill={fill} />
      </G>
    </Svg>
  );
}

export function VinylIcon({ size = 180, ink, accent, paper }: { size?: number; ink: string; accent: string; paper: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Circle cx={50} cy={50} r={48} fill={ink} />
      {[40, 34, 28].map((r) => (
        <Circle key={r} cx={50} cy={50} r={r} fill="none" stroke={paper} strokeWidth={0.4} opacity={0.35} />
      ))}
      <Circle cx={50} cy={50} r={16} fill={accent} />
      <Circle cx={50} cy={50} r={2} fill={paper} />
      <Ellipse cx={34} cy={30} rx={14} ry={5} fill={paper} opacity={0.08} transform="rotate(-35 34 30)" />
    </Svg>
  );
}
