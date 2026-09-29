import { Image } from 'expo-image';
import { useEffect, useMemo } from 'react';
import { StyleSheet, View, type ImageSourcePropType } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { GRID_SIZE, TILE_COUNT } from '@/domain/puzzle';
import { radius, useTheme } from '@/theme/tokens';

import { haptic } from './haptics';

const FOG_OPACITY = 0.9;

/**
 * 10×10 tablo. Kilitli karolar kağıt renginde bir sisle örtülür; sis inceden
 * görünen silüeti bırakır. `reveal` verilen karo sisini dağıtarak açılır.
 */
export function PuzzleBoard({
  image,
  unlocked,
  size,
  reveal = null,
  accent,
}: {
  image: ImageSourcePropType;
  unlocked: number[];
  size: number;
  reveal?: number | null;
  accent: string;
}) {
  const { c } = useTheme();
  const open = useMemo(() => new Set(unlocked), [unlocked]);
  // Karo sınırları tam piksele oturur; kesirli genişlikler karolar arasında görüntü sızdırır.
  const edge = (k: number) => Math.round((k * size) / GRID_SIZE);

  return (
    <View
      style={[styles.board, { width: size + 2, height: size + 2, backgroundColor: c.fog, borderColor: c.line }]}
      accessibilityLabel={`Tablo, ${unlocked.length} / ${TILE_COUNT} parça açık`}>
      <Image source={image} style={StyleSheet.absoluteFill} contentFit="cover" transition={400} />
      {Array.from({ length: TILE_COUNT }, (_, i) => {
        const col = i % GRID_SIZE;
        const row = Math.floor(i / GRID_SIZE);
        const pos = {
          left: edge(col),
          top: edge(row),
          width: edge(col + 1) - edge(col),
          height: edge(row + 1) - edge(row),
        };
        if (i === reveal) return <RevealTile key={i} pos={pos} fog={c.fog} glow={c.glow} accent={accent} />;
        if (open.has(i)) return null;
        return <View key={i} style={[styles.fog, pos, { backgroundColor: c.fog, borderColor: `${c.paper}99` }]} />;
      })}
    </View>
  );
}

function RevealTile({
  pos,
  fog,
  glow,
  accent,
}: {
  pos: { left: number; top: number; width: number; height: number };
  fog: string;
  glow: string;
  accent: string;
}) {
  const reduced = useReducedMotion();
  const fogOpacity = useSharedValue(FOG_OPACITY);
  const ring = useSharedValue(0);

  useEffect(() => {
    if (reduced) {
      fogOpacity.set(withDelay(300, withTiming(0, { duration: 300 })));
      return;
    }
    // Önce karo parlıyor, ardından sis dağılıyor ve parça yerine oturuyor.
    ring.set(withDelay(350, withSequence(withTiming(1, { duration: 450 }), withTiming(0, { duration: 900 }))));
    fogOpacity.set(withDelay(650, withTiming(0, { duration: 900, easing: Easing.out(Easing.cubic) })));
    const t = setTimeout(() => haptic.reward(), 700);
    return () => clearTimeout(t);
  }, [reduced, fogOpacity, ring]);

  const fogStyle = useAnimatedStyle(() => ({ opacity: fogOpacity.value }));
  const ringStyle = useAnimatedStyle(() => ({
    opacity: ring.value,
    transform: [{ scale: 1 + ring.value * 0.6 }],
  }));

  return (
    <>
      <Animated.View style={[styles.fog, pos, { backgroundColor: fog, opacity: FOG_OPACITY }, fogStyle]} />
      <Animated.View
        pointerEvents="none"
        style={[pos, styles.ring, { borderColor: glow, shadowColor: accent }, ringStyle]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  board: { borderRadius: radius.m, overflow: 'hidden', borderWidth: 1 },
  fog: { position: 'absolute', opacity: FOG_OPACITY, borderWidth: StyleSheet.hairlineWidth },
  ring: {
    position: 'absolute',
    borderWidth: 2.5,
    borderRadius: 3,
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
});
