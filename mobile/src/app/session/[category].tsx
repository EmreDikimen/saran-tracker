import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton, QuietButton } from '@/components/Buttons';
import { ContentNote, ContentView, HeartIcon } from '@/components/ContentView';
import { haptic } from '@/components/haptics';
import { RewardOverlay } from '@/components/RewardOverlay';
import { Sheet } from '@/components/Sheet';
import { findItem } from '@/content';
import { CATEGORY_BY_ID, isCategoryId } from '@/content/categories';
import { favoriteKey, useAppStore, type Session } from '@/store/useAppStore';
import { fonts, READING_WIDTH, space, useTheme } from '@/theme/tokens';

/**
 * Odak oturumu (Zen modu). Menüler gizli; bir fincan bu ekranda kalındığı
 * sürece geçerli. Ekrandan çıkınca oturum kapanır.
 */
export default function SessionScreen() {
  const { c } = useTheme();
  const { width } = useWindowDimensions();
  const params = useLocalSearchParams<{ category: string }>();
  const live = useAppStore((s) => s.session);
  const reveal = useAppStore((s) => s.reveal);
  const favorites = useAppStore((s) => s.favorites);
  const { complete, nextItem, endSession, clearReveal, toggleFavorite } = useAppStore.getState();

  // Masaya dönüş animasyonu sırasında oturum kapanmış olabilir; son içeriği ekranda tut.
  const [session, setSession] = useState<Session | null>(live);
  if (live && live !== session) setSession(live);

  const [doneIds, setDoneIds] = useState<string[]>([]);
  const [noteOpen, setNoteOpen] = useState(false);

  const valid = isCategoryId(params.category) && session?.category === params.category;

  useEffect(() => {
    if (!valid) router.replace('/');
    return () => endSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- yalnızca giriş ve çıkışta

  if (!valid || !session) return null;
  const item = findItem(session.category, session.itemId);
  if (!item) return null;

  const category = CATEGORY_BY_ID[session.category];
  const accent = c.accent[session.category];
  const colWidth = Math.min(width - 2 * space.l, READING_WIDTH);
  const done = doneIds.includes(item.id);
  const favKey = favoriteKey(session.category, item.id);
  const liked = favorites.includes(favKey);
  const showReveal = reveal !== null && reveal.category === session.category;

  const leave = () => (router.canGoBack() ? router.back() : router.replace('/'));

  const onDone = () => {
    haptic.done();
    setDoneIds((d) => [...d, item.id]);
    complete();
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.paper }]}>
      <View style={[styles.topBar, { width: colWidth }]}>
        <QuietButton label="← Masa" onPress={leave} />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Favorilerden çıkar' : 'Favorilere ekle'}
          hitSlop={12}
          onPress={() => {
            haptic.tap();
            toggleFavorite(favKey);
          }}>
          <HeartIcon filled={liked} color={liked ? accent : c.inkSoft} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Animated.View key={item.id} entering={FadeIn.duration(450)} style={{ width: colWidth }}>
          <ContentView item={item} width={colWidth} />
          <View style={styles.more}>
            <QuietButton label="Künye ve hikâyesi" onPress={() => setNoteOpen(true)} color={accent} />
          </View>
        </Animated.View>
      </ScrollView>

      <View style={[styles.footer, { width: colWidth }]}>
        {done ? (
          <Animated.View entering={FadeIn.duration(250)} exiting={FadeOut} style={styles.footerInner}>
            <Text style={[styles.doneNote, { color: c.inkSoft }]}>✓ Tamamlandı. Dilersen bir tane daha.</Text>
            <PrimaryButton label={category.next} color={accent} onPress={nextItem} style={styles.full} />
            <QuietButton label="Masaya dön" onPress={leave} />
          </Animated.View>
        ) : (
          <View style={styles.footerInner}>
            <PrimaryButton label={category.done} color={accent} onPress={onDone} style={styles.full} />
            <QuietButton label={category.next} onPress={nextItem} />
          </View>
        )}
      </View>

      <Sheet open={noteOpen} onClose={() => setNoteOpen(false)}>
        <ContentNote item={item} />
      </Sheet>

      {showReveal && (
        <RewardOverlay
          reveal={reveal}
          onContinue={() => {
            clearReveal();
            nextItem();
          }}
          onLeave={() => {
            clearReveal();
            leave();
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, alignItems: 'center' },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: space.s,
    marginLeft: -space.m,
  },
  scroll: { flexGrow: 1, alignItems: 'center', paddingTop: space.l, paddingBottom: space.xl },
  more: { alignItems: 'flex-start', marginTop: space.l, marginLeft: -space.m },
  footer: { paddingBottom: space.m, paddingTop: space.s },
  footerInner: { alignItems: 'center', gap: space.xs },
  full: { alignSelf: 'stretch' },
  doneNote: { fontFamily: fonts.ui, fontSize: 15, marginBottom: space.s },
});
