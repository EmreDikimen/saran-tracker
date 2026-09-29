import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { fonts, radius, space, useTheme } from '@/theme/tokens';

import { haptic } from './haptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/** Ekrandaki tek büyük eylem. Basınca hafifçe içeri çöker. */
export function PrimaryButton({
  label,
  onPress,
  color,
  disabled,
  style,
}: {
  label: string;
  onPress: () => void;
  color: string;
  disabled?: boolean;
  style?: ViewStyle;
}) {
  const { c } = useTheme();
  const scale = useSharedValue(1);
  const animated = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  return (
    <AnimatedPressable
      accessibilityRole="button"
      disabled={disabled}
      onPressIn={() => scale.set(withSpring(0.97, { duration: 150 }))}
      onPressOut={() => scale.set(withSpring(1, { duration: 250 }))}
      onPress={() => {
        haptic.tap();
        onPress();
      }}
      style={[styles.primary, { backgroundColor: disabled ? c.line : color }, animated, style]}>
      <Text style={[styles.primaryLabel, { color: c.surface }]}>{label}</Text>
    </AnimatedPressable>
  );
}

/** İkincil, sessiz eylem: altı çizili metin gibi davranır. */
export function QuietButton({
  label,
  onPress,
  color,
}: {
  label: string;
  onPress: () => void;
  color?: string;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={12}
      onPress={onPress}
      style={({ pressed }) => [styles.quiet, { opacity: pressed ? 0.5 : 1 }]}>
      <Text style={[styles.quietLabel, { color: color ?? c.inkSoft }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    minHeight: 58,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.xl,
  },
  primaryLabel: { fontFamily: fonts.uiBold, fontSize: 18, letterSpacing: 0.2 },
  quiet: { paddingVertical: space.s, paddingHorizontal: space.m, alignItems: 'center' },
  quietLabel: { fontFamily: fonts.uiMedium, fontSize: 16 },
});
