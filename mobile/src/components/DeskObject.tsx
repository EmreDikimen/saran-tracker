import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View, type ImageSourcePropType } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import type { Category, CategoryId } from '@/content/categories';
import { fonts, radius, space, useTheme, type Theme } from '@/theme/tokens';

import { haptic } from './haptics';
import { ScrollIllustration } from './Illustrations';

const SIZE = 64;
/** Görsellerin beyaz alanları her iki temada da beyaz; üzerlerindeki yazı hep koyu. */
const INK = '#2B2620';

/**
 * Serinin objenin neresine yazılacağı: görsel içinde 0-1 oranı ve yazı stili.
 * Oranlar assets/objects/ görselleri üretilirken ölçüldü.
 */
const ART: Record<
  CategoryId,
  {
    image?: ImageSourcePropType;
    x: number;
    y: number;
    size: number;
    /** Obje eğikse sayı da onunla aynı açıda durur. */
    rotate?: string;
    color: (t: Theme) => string;
    /** Plak etiketi: sayının arkasındaki deliği örter. */
    backing?: 'label';
  }
> = {
  // Daktilodan çıkan sayfanın üstü
  siir: { image: require('@/assets/objects/daktilo.png'), x: 0.53, y: 0.22, size: 16, color: () => INK },
  // Boya tüpünün mavi bandı (dalgalı çizginin altındaki geniş yarı), bantla aynı açıda
  sanat: {
    image: require('@/assets/objects/boya_tupu.png'),
    x: 0.443,
    y: 0.43,
    size: 14,
    rotate: '20deg',
    color: () => INK,
  },
  // Plağın ortası
  sarki: {
    image: require('@/assets/objects/pikap.png'),
    x: 0.5,
    y: 0.5,
    size: 15,
    color: () => INK,
    backing: 'label',
  },
  // Kelime için görsel henüz yok; şimdilik parşömen çizimi
  kelime: { x: 0.5, y: 0.5, size: 16, color: ({ c }) => c.ink },
};

/** Masadaki obje; üzerinde kendi serisi yazar. Dokununca aktif kategori olur ve hafifçe kalkar. */
export function DeskObject({
  category,
  selected,
  done,
  streak,
  onPress,
}: {
  category: Category;
  selected: boolean;
  /** Bugün tamamlandıysa objenin altında küçük bir nokta. */
  done: boolean;
  streak: number;
  onPress: () => void;
}) {
  const theme = useTheme();
  const { c } = theme;
  const accent = c.accent[category.id];
  const art = ART[category.id];
  const lift = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(selected ? -6 : 0, { duration: 350 }) }],
  }));
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      accessibilityLabel={`${category.object}: ${category.label}, ${streak} günlük seri`}
      onPress={() => {
        if (!selected) haptic.tap();
        onPress();
      }}
      style={styles.wrap}>
      <Animated.View
        style={[
          styles.card,
          lift,
          {
            backgroundColor: selected ? c.accentSoft[category.id] : 'transparent',
            borderColor: selected ? accent : 'transparent',
          },
        ]}>
        <View style={styles.art}>
          {art.image ? (
            <Image source={art.image} style={styles.art} contentFit="contain" />
          ) : (
            <ScrollIllustration size={SIZE} stroke={c.ink} fill={c.desk} paper={c.surface} />
          )}
          {art.backing === 'label' && (
            // Plağın ortasındaki deliği örter.
            <View
              pointerEvents="none"
              style={[styles.label_, { left: art.x * SIZE - 9, top: art.y * SIZE - 9 }]}
            />
          )}
          <View
            pointerEvents="none"
            style={[
              styles.streak,
              {
                left: art.x * SIZE - SIZE / 2,
                top: art.y * SIZE - 10,
                transform: art.rotate ? [{ rotate: art.rotate }] : undefined,
              },
            ]}>
            <Text
              style={[
                styles.streakText,
                { color: art.color(theme), fontSize: art.size, opacity: streak > 0 ? 1 : 0.5 },
              ]}>
              {streak}
            </Text>
          </View>
        </View>
      </Animated.View>
      <Text style={[styles.label, { color: selected ? c.ink : c.inkSoft }]}>{category.label}</Text>
      <Text style={[styles.dot, { color: accent, opacity: done ? 1 : 0 }]}>●</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center' },
  card: { padding: 6, borderRadius: radius.m, borderWidth: 1.5 },
  art: { width: SIZE, height: SIZE },
  label_: { position: 'absolute', width: 18, height: 18, borderRadius: 9, backgroundColor: '#F7F7F7' },
  streak: { position: 'absolute', width: SIZE, height: 20, alignItems: 'center', justifyContent: 'center' },
  streakText: { fontFamily: fonts.number, includeFontPadding: false, lineHeight: 20 },
  label: { fontFamily: fonts.uiMedium, fontSize: 14, marginTop: space.xs },
  dot: { fontSize: 7, marginTop: 2 },
});
