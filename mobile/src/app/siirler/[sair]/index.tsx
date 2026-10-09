import { Link, useLocalSearchParams } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { ArchiveShell, LoadState } from '@/components/ArchiveShell';
import { usePoet } from '@/content/siirler';
import { fonts, radius, space, useTheme } from '@/theme/tokens';

/** Bir şairin arşivdeki şiirleri, ilk dizeleriyle. */
export default function Poet() {
  const { c } = useTheme();
  const { sair } = useLocalSearchParams<{ sair: string }>();
  const { data, error } = usePoet(sair);

  return (
    <ArchiveShell backLabel="Şairler" backTo="/siirler">
      {!data ? (
        <LoadState error={error} />
      ) : (
        <>
          <Text style={[styles.h1, { color: c.ink }]}>{data.name}</Text>
          <Text style={[styles.meta, { color: c.inkSoft }]}>
            {data.years} · {data.era} · {data.poems.length} şiir
          </Text>
          {data.poems.map((p) => (
            <Link
              key={p.id}
              href={{ pathname: '/siirler/[sair]/[siir]', params: { sair: data.slug, siir: p.id } }}
              asChild>
              <Pressable style={StyleSheet.flatten([styles.row, { borderColor: c.line, backgroundColor: c.surface }])}>
                <Text style={[styles.title, { color: c.ink }]}>{p.title}</Text>
                <Text numberOfLines={1} style={[styles.firstLine, { color: c.inkSoft }]}>
                  {firstLine(p.text)}
                </Text>
              </Pressable>
            </Link>
          ))}
        </>
      )}
    </ArchiveShell>
  );
}

/** Önizleme için ilk dize; "I", "II." gibi bölüm numaralarını atlar. */
function firstLine(text: string): string | undefined {
  return text.split('\n').find((l) => l.trim() && !/^[IVXLC]+\.?$/.test(l.trim()));
}

const styles = StyleSheet.create({
  h1: { fontFamily: fonts.serifSemi, fontSize: 30, marginTop: space.s },
  meta: { fontFamily: fonts.ui, fontSize: 15, marginTop: space.xs, marginBottom: space.l },
  row: {
    borderWidth: 1,
    borderRadius: radius.m,
    paddingVertical: 12,
    paddingHorizontal: space.m,
    marginBottom: space.s,
  },
  title: { fontFamily: fonts.serifMedium, fontSize: 17 },
  firstLine: { fontFamily: fonts.serifItalic, fontSize: 14, marginTop: 2 },
});
