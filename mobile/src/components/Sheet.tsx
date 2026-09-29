import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, READING_WIDTH, space, useTheme } from '@/theme/tokens';

/**
 * Alttan açılan hafif panel. Modal yerine kullanılır: arkadaki içerik
 * görünür kalır, dışarı dokununca kapanır.
 */
export function Sheet({ open, onClose, children }: { open: boolean; onClose: () => void; children: ReactNode }) {
  const { c, dark } = useTheme();
  const insets = useSafeAreaInsets();
  if (!open) return null;
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View entering={FadeIn.duration(200)} exiting={FadeOut.duration(200)} style={StyleSheet.absoluteFill}>
        <Pressable
          accessibilityLabel="Kapat"
          onPress={onClose}
          style={[StyleSheet.absoluteFill, { backgroundColor: dark ? '#0008' : '#2B262033' }]}
        />
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(280)}
        exiting={SlideOutDown.duration(220)}
        style={[
          styles.panel,
          { backgroundColor: c.surface, borderColor: c.line, paddingBottom: insets.bottom + space.l },
        ]}>
        <View style={[styles.handle, { backgroundColor: c.line }]} />
        {children}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '100%',
    maxWidth: READING_WIDTH + 2 * space.l,
    borderTopLeftRadius: radius.l,
    borderTopRightRadius: radius.l,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: space.l,
    paddingTop: space.m,
  },
  handle: { width: 40, height: 4, borderRadius: 2, alignSelf: 'center', marginBottom: space.m },
});
