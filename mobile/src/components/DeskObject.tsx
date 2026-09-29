import { Pressable, StyleSheet, Text } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

import type { Category } from '@/content/categories';
import { fonts, radius, space, useTheme } from '@/theme/tokens';

import { haptic } from './haptics';
import { DeskIllustration } from './Illustrations';

/** Masadaki obje; dokununca aktif kategori olur ve hafifçe masadan kalkar. */
export function DeskObject({
  category,
  selected,
  done,
  onPress,
}: {
  category: Category;
  selected: boolean;
  /** Bugün tamamlandıysa objenin altında küçük bir nokta. */
  done: boolean;
  onPress: () => void;
}) {
  const { c } = useTheme();
  const accent = c.accent[category.id];
  const lift = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(selected ? -6 : 0, { duration: 350 }) }],
  }));
  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected }}
      accessibilityLabel={`${category.object}: ${category.label}`}
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
        <DeskIllustration
          category={category.id}
          size={50}
          stroke={selected ? c.ink : c.inkSoft}
          fill={selected ? c.accentSoft[category.id] : c.desk}
          accent={selected ? accent : c.inkFaint}
          paper={c.surface}
        />
      </Animated.View>
      <Text style={[styles.label, { color: selected ? c.ink : c.inkSoft }]}>{category.label}</Text>
      <Text style={[styles.dot, { color: accent, opacity: done ? 1 : 0 }]}>●</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center' },
  card: { padding: space.s, borderRadius: radius.m, borderWidth: 1.5 },
  label: { fontFamily: fonts.uiMedium, fontSize: 14, marginTop: space.xs },
  dot: { fontSize: 7, marginTop: 2 },
});
