import { router, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { QuietButton } from '@/components/Buttons';
import { fonts, READING_WIDTH, space, useTheme } from '@/theme/tokens';

/** Şiir arşivi ekranlarının ortak iskeleti: geri düğmesi ve okuma sütunu. */
export function ArchiveShell({
  backLabel,
  backTo,
  children,
}: {
  backLabel: string;
  backTo: Href;
  children: ReactNode;
}) {
  const { c } = useTheme();
  const { width } = useWindowDimensions();
  const colWidth = Math.min(width - 2 * space.l, READING_WIDTH);
  // Sayfaya doğrudan bağlantıyla gelindiyse geri gidilecek yer yok; üst sayfaya geç.
  const leave = () => (router.canGoBack() ? router.back() : router.replace(backTo));

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: c.paper }]}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={{ width: colWidth }}>
          <View style={styles.back}>
            <QuietButton label={`← ${backLabel}`} onPress={leave} />
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/** Veri gelene kadar ya da gelemezse gösterilen durum. */
export function LoadState({ error }: { error: boolean }) {
  const { c } = useTheme();
  return (
    <View style={styles.state}>
      {error ? (
        <Text style={[styles.stateText, { color: c.inkSoft }]}>Bu sayfa yüklenemedi.</Text>
      ) : (
        <ActivityIndicator color={c.inkSoft} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { alignItems: 'center', paddingBottom: space.xxl },
  back: { alignItems: 'flex-start', marginLeft: -space.m, marginTop: space.s },
  state: { paddingVertical: space.xxl, alignItems: 'center' },
  stateText: { fontFamily: fonts.ui, fontSize: 16 },
});
