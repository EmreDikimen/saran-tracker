import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { boardPainting } from '@/content/artworks';
import { CATEGORY_BY_ID } from '@/content/categories';
import { TILE_COUNT } from '@/domain/puzzle';
import type { Reveal } from '@/store/useAppStore';
import { useAppStore } from '@/store/useAppStore';
import { fonts, space, useTheme } from '@/theme/tokens';

import { PrimaryButton, QuietButton } from './Buttons';
import { PuzzleBoard } from './PuzzleBoard';

/**
 * Günün ilk tamamlanması: ekran tabloya döner ve yeni parça yerine oturur.
 * Oturum açık kalır; kullanıcı devam edebilir ya da masaya dönebilir.
 */
export function RewardOverlay({
  reveal,
  onContinue,
  onLeave,
}: {
  reveal: Reveal;
  onContinue: () => void;
  onLeave: () => void;
}) {
  const { c } = useTheme();
  const { width, height } = useWindowDimensions();
  const board = useAppStore((s) => s.boards[reveal.category]);
  const streak = useAppStore((s) => s.streaks[reveal.category].count);
  const painting = boardPainting(reveal.category, reveal.paintingIndex);
  const accent = c.accent[reveal.category];
  const size = Math.min(width - 2 * space.l, 440, height * 0.5);
  const complete = board.unlocked.length >= TILE_COUNT;
  const category = CATEGORY_BY_ID[reveal.category];

  return (
    <Animated.View
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(250)}
      style={[StyleSheet.absoluteFill, { backgroundColor: c.paper }]}>
      <SafeAreaView style={styles.wrap}>
        <Animated.Text
          entering={FadeInDown.delay(150).duration(400)}
          style={[styles.kicker, { color: accent }]}>
          YENİ BİR PARÇA
        </Animated.Text>
        <View style={{ marginVertical: space.l }}>
          <PuzzleBoard
            image={painting.image}
            unlocked={board.unlocked}
            size={size}
            reveal={reveal.tile}
            accent={accent}
          />
        </View>
        <Animated.View entering={FadeIn.delay(1400).duration(500)} style={styles.texts}>
          {complete ? (
            <>
              <Text style={[styles.title, { color: c.ink }]}>Tablo tamamlandı.</Text>
              <Text style={[styles.body, { color: c.inkSoft }]}>
                {painting.title}, {painting.artist} ({painting.date}). Yarın yeni bir tablo başlıyor.
              </Text>
            </>
          ) : (
            <>
              <Text style={[styles.title, { color: c.ink }]}>
                {board.unlocked.length} / {TILE_COUNT}
              </Text>
              <Text style={[styles.body, { color: c.inkSoft }]}>
                {category.label} serin {streak} gün. Bu parça artık hep senin.
              </Text>
            </>
          )}
        </Animated.View>
        <Animated.View entering={FadeIn.delay(1800).duration(400)} style={styles.actions}>
          <PrimaryButton label="Devam et" color={accent} onPress={onContinue} style={styles.btn} />
          <QuietButton label="Masaya dön" onPress={onLeave} />
        </Animated.View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: space.l },
  kicker: { fontFamily: fonts.uiBold, fontSize: 13, letterSpacing: 2.5 },
  texts: { alignItems: 'center', maxWidth: 420 },
  title: { fontFamily: fonts.serifSemi, fontSize: 26, fontVariant: ['tabular-nums'] },
  body: { fontFamily: fonts.ui, fontSize: 16, textAlign: 'center', marginTop: space.s, lineHeight: 23 },
  actions: { alignSelf: 'stretch', alignItems: 'center', marginTop: space.xl, gap: space.s },
  btn: { alignSelf: 'stretch', maxWidth: 440, width: '100%' },
});
