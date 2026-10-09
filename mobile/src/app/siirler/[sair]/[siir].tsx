import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { ArchiveShell, LoadState } from '@/components/ArchiveShell';
import { QuietButton } from '@/components/Buttons';
import { usePoet } from '@/content/siirler';
import { fonts, space, useTheme } from '@/theme/tokens';

/** Tek şiir; altta aynı şairin önceki ve sonraki şiirine geçiş. */
export default function PoemPage() {
  const { c } = useTheme();
  const { sair, siir } = useLocalSearchParams<{ sair: string; siir: string }>();
  const { data, error } = usePoet(sair);

  const index = data ? data.poems.findIndex((p) => p.id === siir) : -1;
  const poem = data?.poems[index];
  const go = (i: number) =>
    data && router.replace({ pathname: '/siirler/[sair]/[siir]', params: { sair: data.slug, siir: data.poems[i].id } });

  return (
    <ArchiveShell
      backLabel={data?.name ?? 'Şair'}
      backTo={{ pathname: '/siirler/[sair]', params: { sair: sair ?? '' } }}>
      {!data || !poem ? (
        <LoadState error={error || (!!data && !poem)} />
      ) : (
        <>
          <Text style={[styles.title, { color: c.ink }]}>{poem.title}</Text>
          <Text style={[styles.by, { color: c.inkSoft }]}>
            {data.name} · {data.years}
          </Text>
          <Text selectable style={[styles.poem, { color: c.ink }]}>
            {poem.text}
          </Text>

          <Pressable accessibilityRole="link" onPress={() => Linking.openURL(poem.source)} hitSlop={8}>
            <Text style={[styles.source, { color: c.inkFaint }]}>Kaynak: Vikikaynak ↗</Text>
          </Pressable>

          <View style={[styles.nav, { borderColor: c.line }]}>
            {index > 0 ? <QuietButton label="← Önceki" onPress={() => go(index - 1)} /> : <View />}
            {index < data.poems.length - 1 ? (
              <QuietButton label="Sonraki →" onPress={() => go(index + 1)} />
            ) : (
              <View />
            )}
          </View>
        </>
      )}
    </ArchiveShell>
  );
}

const styles = StyleSheet.create({
  title: { fontFamily: fonts.serifSemi, fontSize: 27, lineHeight: 36, marginTop: space.s },
  by: { fontFamily: fonts.ui, fontSize: 15, marginTop: space.xs },
  poem: { fontFamily: fonts.serif, fontSize: 19, lineHeight: 33, marginTop: space.xl },
  source: { fontFamily: fonts.ui, fontSize: 13, marginTop: space.xl },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    marginTop: space.l,
    paddingTop: space.s,
    marginHorizontal: -space.m,
  },
});
