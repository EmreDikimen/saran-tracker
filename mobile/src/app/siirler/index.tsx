import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ArchiveShell, LoadState } from '@/components/ArchiveShell';
import { foldTr, usePoetIndex } from '@/content/siirler';
import { fonts, radius, space, useTheme } from '@/theme/tokens';

/** Şairine göre şiir arşivi: dönemlere ayrılmış şair listesi. */
export default function Poets() {
  const { c } = useTheme();
  const { data, error } = usePoetIndex();
  const [query, setQuery] = useState('');

  const q = foldTr(query.trim());
  const poets = data ? data.poets.filter((p) => !q || foldTr(p.name).includes(q)) : [];

  return (
    <ArchiveShell backLabel="Masa" backTo="/">
      <Text style={[styles.h1, { color: c.ink }]}>Şiirler</Text>
      {data && (
        <Text style={[styles.lead, { color: c.inkSoft }]}>
          {data.poets.length} şairden {data.total} şiir. Hepsi telif süresi dolmuş, kamu malı eserler.
        </Text>
      )}

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Şair ara"
        placeholderTextColor={c.inkFaint}
        autoCorrect={false}
        style={[styles.search, { color: c.ink, borderColor: c.line, backgroundColor: c.surface }]}
      />

      {!data ? (
        <LoadState error={error} />
      ) : poets.length === 0 ? (
        <Text style={[styles.lead, { color: c.inkSoft }]}>Bu adla bir şair yok.</Text>
      ) : (
        data.eras.map((era) => {
          const group = poets.filter((p) => p.era === era);
          if (group.length === 0) return null;
          return (
            <View key={era}>
              <Text style={[styles.h2, { color: c.inkSoft }]}>{era.toLocaleUpperCase('tr')}</Text>
              {group.map((p) => (
                <Link key={p.slug} href={{ pathname: '/siirler/[sair]', params: { sair: p.slug } }} asChild>
                  <Pressable style={StyleSheet.flatten([styles.row, { borderColor: c.line, backgroundColor: c.surface }])}>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.name, { color: c.ink }]}>{p.name}</Text>
                      <Text style={[styles.meta, { color: c.inkSoft }]}>{p.years}</Text>
                    </View>
                    <Text style={[styles.count, { color: c.accent.siir }]}>{p.count}</Text>
                  </Pressable>
                </Link>
              ))}
            </View>
          );
        })
      )}

      <Text style={[styles.foot, { color: c.inkFaint }]}>
        Metinler Vikikaynak&apos;tan alınmıştır. Yayından önce basılı kaynaklarla karşılaştırılmalıdır.
      </Text>
    </ArchiveShell>
  );
}

const styles = StyleSheet.create({
  h1: { fontFamily: fonts.serifSemi, fontSize: 30, marginTop: space.s },
  lead: { fontFamily: fonts.ui, fontSize: 15, lineHeight: 22, marginTop: space.s },
  search: {
    fontFamily: fonts.ui,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: radius.m,
    paddingHorizontal: space.m,
    paddingVertical: 12,
    marginTop: space.l,
  },
  h2: { fontFamily: fonts.uiBold, fontSize: 12, letterSpacing: 2, marginTop: space.xl, marginBottom: space.m },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: space.m,
    borderWidth: 1,
    borderRadius: radius.m,
    paddingVertical: 12,
    paddingHorizontal: space.m,
    marginBottom: space.s,
  },
  name: { fontFamily: fonts.serifMedium, fontSize: 17 },
  meta: { fontFamily: fonts.ui, fontSize: 13, marginTop: 2 },
  count: { fontFamily: fonts.number, fontSize: 20 },
  foot: { fontFamily: fonts.ui, fontSize: 12, lineHeight: 18, marginTop: space.xl },
});
