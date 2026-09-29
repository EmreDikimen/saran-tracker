import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/Buttons';
import { CupRow } from '@/components/CupRow';
import { DeskObject } from '@/components/DeskObject';
import { CupIcon } from '@/components/Illustrations';
import { PuzzleBoard } from '@/components/PuzzleBoard';
import { StreakBadge } from '@/components/StreakBadge';
import { boardPainting } from '@/content/artworks';
import { CATEGORIES, CATEGORY_BY_ID } from '@/content/categories';
import { DevPanel } from '@/dev/DevPanel';
import { msUntilNextCup, settleCups } from '@/domain/cups';
import { TILE_COUNT } from '@/domain/puzzle';
import { currentStreak } from '@/domain/streak';
import { dayKey, formatCountdown } from '@/domain/time';
import { useNow } from '@/hooks/useNow';
import { useAppStore } from '@/store/useAppStore';
import { fonts, space, useTheme } from '@/theme/tokens';

const MAX_WIDTH = 480;

export default function Desk() {
  const { c } = useTheme();
  const now = useNow();
  const { width, height } = useWindowDimensions();
  const cups = useAppStore((s) => s.cups);
  const active = useAppStore((s) => s.active);
  const boards = useAppStore((s) => s.boards);
  const streaks = useAppStore((s) => s.streaks);
  const setActive = useAppStore((s) => s.setActive);
  const startSession = useAppStore((s) => s.startSession);
  const endSession = useAppStore((s) => s.endSession);

  // Masaya dönmek açık oturumu kapatır.
  useFocusEffect(useCallback(() => endSession(), [endSession]));

  const today = dayKey(now);
  if (settleCups(cups, now).count === 0) return <ClosedDoor now={now} />;

  const category = CATEGORY_BY_ID[active];
  const accent = c.accent[active];
  const board = boards[active];
  const painting = boardPainting(active, board.paintingIndex);
  const doneToday = streaks[active].lastDay === today;
  const contentWidth = Math.min(width, MAX_WIDTH) - 2 * space.l;
  // Tablo, altındaki masa ve tek buton kaydırmadan görünecek kadar büyür.
  const boardSize = Math.max(180, Math.min(contentWidth, height - 470));

  const begin = () => {
    if (startSession(active)) router.push({ pathname: '/session/[category]', params: { category: active } });
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.paper }]}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.column, { width: contentWidth }]}>
          <View style={styles.topBar}>
            <CupRow cups={cups} now={now} />
            <View style={styles.topRight}>
              <StreakBadge count={currentStreak(streaks[active], today)} color={accent} />
              <Pressable
                accessibilityRole="button"
                onPress={() => router.push('/archive')}
                hitSlop={10}>
                <Text style={[styles.link, { color: c.inkSoft }]}>Arşiv</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.heading}>
            <Text style={[styles.kicker, { color: accent }]}>{category.label.toLocaleUpperCase('tr')}</Text>
            <Text style={[styles.progress, { color: c.inkSoft }]}>
              Gizli tablo · {board.unlocked.length}/{TILE_COUNT}
            </Text>
          </View>

          <Animated.View key={active} entering={FadeIn.duration(350)} style={styles.boardWrap}>
            <PuzzleBoard image={painting.image} unlocked={board.unlocked} size={boardSize} accent={accent} />
          </Animated.View>

          <View style={[styles.desk, { borderColor: c.line, backgroundColor: c.desk }]}>
            {CATEGORIES.map((cat) => (
              <DeskObject
                key={cat.id}
                category={cat}
                selected={cat.id === active}
                done={streaks[cat.id].lastDay === today}
                onPress={() => setActive(cat.id)}
              />
            ))}
          </View>

          <Text style={[styles.hint, { color: c.inkSoft }]}>
            {doneToday
              ? 'Bugünün parçası açıldı. İstersen bir tane daha keşfet.'
              : 'Bir fincan harca, bugünün parçasını aç.'}
          </Text>
          <PrimaryButton label={category.cta} color={accent} onPress={begin} />
        </View>
      </ScrollView>
      <DevPanel />
    </SafeAreaView>
  );
}

/** Fincan kalmadığında: uygulama tamamen kapanır, arşiv dahil. */
function ClosedDoor({ now }: { now: number }) {
  const { c } = useTheme();
  const cups = useAppStore((s) => s.cups);
  const left = msUntilNextCup(cups, now) ?? 0;
  return (
    <SafeAreaView style={[styles.screen, styles.center, { backgroundColor: c.paper }]}>
      <Animated.View entering={FadeIn.duration(500)} style={styles.closed}>
        <View style={styles.bigCups}>
          {Array.from({ length: cups.capacity }, (_, i) => (
            <CupIcon key={i} full={false} size={44} color={c.ink} faint={c.inkFaint} coffee={c.coffee} />
          ))}
        </View>
        <Text style={[styles.closedTitle, { color: c.ink }]}>Fincanlar boş.</Text>
        <Text style={[styles.closedBody, { color: c.inkSoft }]}>
          Bir sonrakinin demlenmesine{' '}
          <Text style={[styles.countdown, { color: c.ink }]}>{formatCountdown(left)}</Text> var.
        </Text>
        <Text style={[styles.closedNote, { color: c.inkFaint }]}>Masa seni bekliyor. Şimdilik mola.</Text>
      </Animated.View>
      <DevPanel />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center' },
  scroll: { flexGrow: 1, alignItems: 'center', paddingBottom: space.xxl },
  column: { flex: 1, paddingTop: space.m },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  topRight: { flexDirection: 'row', alignItems: 'center', gap: space.m },
  link: { fontFamily: fonts.uiMedium, fontSize: 15 },
  heading: { marginTop: space.m, marginBottom: space.m, alignItems: 'center' },
  kicker: { fontFamily: fonts.uiBold, fontSize: 13, letterSpacing: 2 },
  progress: { fontFamily: fonts.serifItalic, fontSize: 15, marginTop: 2 },
  boardWrap: { alignItems: 'center' },
  desk: {
    flexDirection: 'row',
    marginTop: space.l,
    paddingTop: space.m,
    paddingBottom: space.xs,
    borderRadius: 18,
    borderWidth: 1,
  },
  hint: { fontFamily: fonts.ui, fontSize: 15, textAlign: 'center', marginTop: space.m, marginBottom: space.m },
  closed: { alignItems: 'center', paddingHorizontal: space.xl, maxWidth: 420 },
  bigCups: { flexDirection: 'row', gap: space.s, marginBottom: space.xl },
  closedTitle: { fontFamily: fonts.serifSemi, fontSize: 28 },
  closedBody: { fontFamily: fonts.serif, fontSize: 19, textAlign: 'center', marginTop: space.s, lineHeight: 30 },
  countdown: { fontFamily: fonts.uiBold, fontVariant: ['tabular-nums'] },
  closedNote: { fontFamily: fonts.ui, fontSize: 15, marginTop: space.xl },
});
