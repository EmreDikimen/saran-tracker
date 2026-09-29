import { StyleSheet, Text, View } from 'react-native';

import { fonts, radius, space, useTheme } from '@/theme/tokens';

import { FlameIcon } from './Illustrations';

export function StreakBadge({ count, color }: { count: number; color: string }) {
  const { c } = useTheme();
  const alive = count > 0;
  return (
    <View
      style={[styles.badge, { borderColor: c.line }]}
      accessibilityLabel={alive ? `${count} günlük seri` : 'Henüz seri yok'}>
      <FlameIcon size={15} color={alive ? color : c.inkFaint} />
      <Text style={[styles.text, { color: alive ? c.ink : c.inkFaint }]}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: space.s + 2,
    paddingVertical: 5,
  },
  text: { fontFamily: fonts.uiBold, fontSize: 15, fontVariant: ['tabular-nums'] },
});
