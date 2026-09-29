import Svg, { Circle, Ellipse, G, Line, Path, Rect } from 'react-native-svg';

import type { CategoryId } from '@/content/categories';

type Tone = { stroke: string; fill: string; accent: string; paper: string };

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

export function FlameIcon({ size = 16, color }: { size?: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2.5c.4 4.2 5.8 6.4 5.8 12a5.8 5.8 0 0 1-11.6 0c0-2.7 1.6-4.6 2.8-5.6.1 1.8.9 3 2 3.2-.6-3.4.2-6.6 1-9.6z"
        fill={color}
      />
    </Svg>
  );
}

function Typewriter({ stroke, fill, accent, paper }: Tone) {
  return (
    <G stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
      <Rect x={19} y={8} width={26} height={22} rx={1.5} fill={paper} />
      <Line x1={24} y1={15} x2={40} y2={15} strokeWidth={1.4} />
      <Line x1={24} y1={20} x2={36} y2={20} strokeWidth={1.4} />
      <Rect x={10} y={26} width={44} height={6} rx={3} fill={accent} />
      <Path d="M8 34h48l-3 18H11z" fill={fill} />
      {[16, 23, 30, 37, 44].map((x) => (
        <Circle key={`a${x}`} cx={x + 2} cy={40} r={2} fill={paper} strokeWidth={1.4} />
      ))}
      {[19, 26, 33, 40].map((x) => (
        <Circle key={`b${x}`} cx={x + 2.5} cy={46} r={2} fill={paper} strokeWidth={1.4} />
      ))}
    </G>
  );
}

function PaintTube({ stroke, fill, accent, paper }: Tone) {
  return (
    <G stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
      <Path d="M44 13c4 1 7 4 6 8-.6 2.4-3 2.8-4.4 1.4" fill={accent} />
      <Rect x={27} y={5} width={10} height={8} rx={2} fill={paper} />
      <Path d="M29 13h6l6 7H23z" fill={paper} />
      <Path d="M23 20h18l-3 30H26z" fill={fill} />
      <Rect x={25} y={29} width={14} height={9} rx={1} fill={accent} strokeWidth={1.4} />
      <Rect x={22} y={50} width={20} height={6} rx={1.5} fill={paper} />
      <Line x1={26} y1={53} x2={38} y2={53} strokeWidth={1.2} />
    </G>
  );
}

function RecordPlayer({ stroke, fill, accent, paper }: Tone) {
  return (
    <G stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
      <Rect x={6} y={14} width={52} height={40} rx={5} fill={fill} />
      <Circle cx={28} cy={34} r={15} fill={stroke} />
      <Circle cx={28} cy={34} r={10} fill="none" stroke={paper} strokeWidth={0.8} opacity={0.5} />
      <Circle cx={28} cy={34} r={5} fill={accent} stroke={accent} />
      <Circle cx={28} cy={34} r={1} fill={paper} stroke="none" />
      <Circle cx={50} cy={21} r={3.2} fill={paper} />
      <Path d="M50 21l-1 14-6 4" fill="none" strokeWidth={2.2} />
    </G>
  );
}

function Scroll({ stroke, fill, accent, paper }: Tone) {
  return (
    <G stroke={stroke} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round">
      <Rect x={15} y={13} width={34} height={38} fill={paper} />
      <Rect x={10} y={8} width={44} height={8} rx={4} fill={fill} />
      <Rect x={10} y={48} width={44} height={8} rx={4} fill={fill} />
      <Line x1={21} y1={24} x2={43} y2={24} strokeWidth={1.4} />
      <Line x1={21} y1={30} x2={39} y2={30} strokeWidth={1.4} />
      <Line x1={21} y1={36} x2={41} y2={36} strokeWidth={1.4} />
      <Circle cx={43} cy={42} r={3} fill={accent} strokeWidth={1.2} />
    </G>
  );
}

const OBJECTS: Record<CategoryId, (t: Tone) => React.JSX.Element> = {
  siir: Typewriter,
  sanat: PaintTube,
  sarki: RecordPlayer,
  kelime: Scroll,
};

export function DeskIllustration({
  category,
  size = 56,
  ...tone
}: Tone & { category: CategoryId; size?: number }) {
  const Obj = OBJECTS[category];
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64">
      <Obj {...tone} />
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
