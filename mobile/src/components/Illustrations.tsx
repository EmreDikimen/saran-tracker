import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';

export function CupIcon({
  full,
  size = 30,
  color,
  faint,
  coffee,
}: {
  full: boolean;
  size?: number;
  color: string;
  faint: string;
  coffee: string;
}) {
  const stroke = full ? color : faint;
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      {full && (
        <G stroke={stroke} strokeWidth={1.4} strokeLinecap="round" fill="none" opacity={0.7}>
          <Path d="M12 10c-1.6-1.6 1.6-2.6 0-4.4" />
          <Path d="M17 10c-1.6-1.6 1.6-2.6 0-4.4" />
        </G>
      )}
      <Path
        d="M7 13h16v5a8 8 0 0 1-8 8a8 8 0 0 1-8-8z"
        fill={full ? coffee : 'none'}
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeDasharray={full ? undefined : '2.5 2'}
      />
      <Path
        d="M23 15h1.6a3 3 0 0 1 0 6H22.6"
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinecap="round"
      />
      <Line x1={5} y1={28.5} x2={27} y2={28.5} stroke={stroke} strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
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
