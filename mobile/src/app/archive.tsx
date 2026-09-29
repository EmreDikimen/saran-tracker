import { Image } from 'expo-image';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuietButton } from '@/components/Buttons';
import { PuzzleBoard } from '@/components/PuzzleBoard';
import { findItem, itemTitle } from '@/content';
import { boardPainting } from '@/content/artworks';
import { CATEGORIES, isCategoryId } from '@/content/categories';
import { settleCups } from '@/domain/cups';
import { TILE_COUNT } from '@/domain/puzzle';
import { useNow } from '@/hooks/useNow';
import { useAppStore } from '@/store/useAppStore';
import { fonts, radius, READING_WIDTH, space, useTheme } from '@/theme/tokens';

export default function Archive() {
  const { c } = useTheme();
  const { width } = useWindowDimensions();
  const now = useNow(30_000);
  const cups = useAppStore((s) => s.cups);
  const boards = useAppStore((s) => s.boards);
  const favorites = useAppStore((s) => s.favorites);

  const colWidth = Math.min(width - 2 * space.l, READING_WIDTH);
  const tile = (colWidth - space.m) / 2;
  const leave = () => (router.canGoBack() ? router.back() : router.replace('/'));

  // Fincan kalmadıysa arşiv de kapalı: "arşivde kaybolma" tuzağına karşı.
  if (settleCups(cups, now).count === 0) {
    return (
      <SafeAreaView style={[styles.screen, styles.center, { backgroundColor: c.paper }]}>
        <Text style={[styles.h1, { color: c.ink }]}>Arşiv şimdilik kapalı.</Text>
        <Text style={[styles.empty, { color: c.inkSoft }]}>Bir fincan demlenince açılacak.</Text>
        <QuietButton label="← Masa" onPress={leave} />
      </SafeAreaView>
    );
  }

  const favItems = favorites.flatMap((key) => {
    const [cat, id] = key.split(':');
    const item = isCategoryId(cat) ? findItem(cat, id) : undefined;
    return item ? [{ key, item }] : [];
  });

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.paper }]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={{ width: colWidth }}>
          <View style={styles.back}>
            <QuietButton label="← Masa" onPress={leave} />
          </View>
          <Text style={[styles.h1, { color: c.ink }]}>Arşiv</Text>

          <Text style={[styles.h2, { color: c.inkSoft }]}>TABLOLAR</Text>
          <View style={styles.grid}>
            {CATEGORIES.map((cat) => {
              const board = boards[cat.id];
              const finished = board.paintingIndex + (board.unlocked.length >= TILE_COUNT ? 1 : 0);
              return (
                <View key={cat.id} style={{ width: tile }}>
                  <PuzzleBoard
                    image={boardPainting(cat.id, board.paintingIndex).image}
                    unlocked={board.unlocked}
                    size={tile}
                    accent={c.accent[cat.id]}
                  />
                  <Text style={[styles.boardLabel, { color: c.ink }]}>{cat.label}</Text>
                  <Text style={[styles.boardMeta, { color: c.inkSoft }]}>
                    {board.unlocked.length}/{TILE_COUNT}
                    {finished > 0 ? ` · ${finished} tablo tamamlandı` : ''}
                  </Text>
                </View>
              );
            })}
          </View>

          <Text style={[styles.h2, { color: c.inkSoft }]}>FAVORİLER</Text>
          {favItems.length === 0 ? (
            <Text style={[styles.empty, { color: c.inkSoft }]}>
              Bir eserde kalbe dokunduğunda burada birikecek.
            </Text>
          ) : (
            favItems.map(({ key, item }) => {
              const { title, by } = itemTitle(item);
              return (
                <View key={key} style={[styles.fav, { borderColor: c.line, backgroundColor: c.surface }]}>
                  {item.kind === 'sanat' ? (
                    <Image source={item.image} style={styles.thumb} contentFit="cover" />
                  ) : (
                    <View style={[styles.thumb, { backgroundColor: c.accentSoft[item.kind] }]} />
                  )}
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.favTitle, { color: c.ink }]}>{title}</Text>
                    <Text style={[styles.boardMeta, { color: c.inkSoft }]}>{by}</Text>
                  </View>
                </View>
              );
            })
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  center: { alignItems: 'center', justifyContent: 'center', gap: space.s },
  scroll: { alignItems: 'center', paddingBottom: space.xxl },
  back: { alignItems: 'flex-start', marginLeft: -space.m, marginTop: space.s },
  h1: { fontFamily: fonts.serifSemi, fontSize: 30, marginTop: space.s },
  h2: { fontFamily: fonts.uiBold, fontSize: 12, letterSpacing: 2, marginTop: space.xl, marginBottom: space.m },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: space.m },
  boardLabel: { fontFamily: fonts.uiBold, fontSize: 15, marginTop: space.s },
  boardMeta: { fontFamily: fonts.ui, fontSize: 13, marginTop: 2 },
  empty: { fontFamily: fonts.ui, fontSize: 15, lineHeight: 22 },
  fav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.m,
    borderWidth: 1,
    borderRadius: radius.m,
    padding: space.s,
    marginBottom: space.s,
  },
  thumb: { width: 48, height: 48, borderRadius: radius.s },
  favTitle: { fontFamily: fonts.serifMedium, fontSize: 16 },
});
