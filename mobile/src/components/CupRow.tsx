import { StyleSheet, Text, View } from 'react-native';

import { msUntilNextCup, settleCups, type Cups } from '@/domain/cups';
import { formatCountdown } from '@/domain/time';
import { fonts, space, useTheme } from '@/theme/tokens';

import { CupIcon } from './Illustrations';

/**
 * Kalan fincanlar. Dolmakta olan ilk boş fincanın altında geri sayım durur.
 */
export function CupRow({ cups, now, size = 30 }: { cups: Cups; now: number; size?: number }) {
  const { c } = useTheme();
  const settled = settleCups(cups, now);
  const left = msUntilNextCup(cups, now);
  return (
    <View
      style={styles.row}
      accessibilityLabel={`${settled.count} fincan kaldı${left !== null ? `, sıradaki ${formatCountdown(left)} sonra` : ''}`}>
      {Array.from({ length: settled.capacity }, (_, i) => {
        const full = i < settled.count;
        const refilling = i === settled.count && left !== null;
        return (
          <View key={i} style={styles.cup}>
            <CupIcon full={full} size={size} color={c.ink} faint={c.inkFaint} coffee={c.coffee} />
            <Text style={[styles.timer, { color: c.inkSoft, opacity: refilling ? 1 : 0 }]}>
              {refilling ? formatCountdown(left) : '00:00'}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: space.xs },
  cup: { alignItems: 'center' },
  timer: { fontFamily: fonts.uiMedium, fontSize: 11, fontVariant: ['tabular-nums'], marginTop: 1 },
});
