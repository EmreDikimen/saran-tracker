import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Sheet } from '@/components/Sheet';
import { CATEGORY_BY_ID } from '@/content/categories';
import { DAY, HOUR } from '@/domain/time';
import { useAppStore } from '@/store/useAppStore';
import { fonts, radius, space, useTheme } from '@/theme/tokens';

/**
 * Prototipi denemek için: zamanı ileri sarma, tabloyu doldurma, sıfırlama.
 * Gerçek uygulamada yer almayacak.
 */
export function DevPanel() {
  const { c } = useTheme();
  const [open, setOpen] = useState(false);
  const dev = useAppStore((s) => s.dev);
  const active = useAppStore((s) => s.active);
  const offset = useAppStore((s) => s.timeOffset);

  const actions: [string, () => void][] = [
    ['+1 saat', () => dev.advance(HOUR)],
    ['+3 saat', () => dev.advance(3 * HOUR)],
    ['+1 gün', () => dev.advance(DAY)],
    [`${CATEGORY_BY_ID[active].label} tablosunu 60'a doldur`, () => dev.fillBoard(active, 60)],
    [`${CATEGORY_BY_ID[active].label} tablosunu 99'a doldur`, () => dev.fillBoard(active, 99)],
    ['Her şeyi sıfırla', () => dev.reset()],
  ];

  return (
    <>
      <Pressable
        accessibilityLabel="Prototip paneli"
        onPress={() => setOpen(true)}
        hitSlop={8}
        style={[styles.fab, { borderColor: c.line, backgroundColor: c.surface }]}>
        <Text style={[styles.fabText, { color: c.inkFaint }]}>dev</Text>
      </Pressable>
      <Sheet open={open} onClose={() => setOpen(false)}>
        <Text style={[styles.title, { color: c.ink }]}>Prototip paneli</Text>
        <Text style={[styles.sub, { color: c.inkSoft }]}>
          Zaman kaydırması: {Math.round(offset / HOUR)} saat
        </Text>
        <View style={styles.grid}>
          {actions.map(([label, run]) => (
            <Pressable
              key={label}
              onPress={run}
              style={({ pressed }) => [
                styles.action,
                { borderColor: c.line, backgroundColor: pressed ? c.desk : c.paper },
              ]}>
              <Text style={[styles.actionText, { color: c.ink }]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      </Sheet>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: space.m,
    bottom: space.m,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    opacity: 0.7,
  },
  fabText: { fontFamily: fonts.uiMedium, fontSize: 12 },
  title: { fontFamily: fonts.uiBold, fontSize: 18 },
  sub: { fontFamily: fonts.ui, fontSize: 14, marginTop: 2, marginBottom: space.m },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.s },
  action: { borderWidth: 1, borderRadius: radius.s, paddingHorizontal: 12, paddingVertical: 10 },
  actionText: { fontFamily: fonts.uiMedium, fontSize: 14 },
});
