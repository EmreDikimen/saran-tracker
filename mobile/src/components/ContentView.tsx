import { Image } from 'expo-image';
import { Linking, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import type { ContentItem } from '@/content';
import { spotifyUrl } from '@/content/songs';
import { fonts, radius, space, useTheme } from '@/theme/tokens';

import { VinylIcon } from './Illustrations';

/** Oturumdaki eser. İlk bakışta yalnızca eserin kendisi; bağlam alttaki panelde. */
export function ContentView({ item, width }: { item: ContentItem; width: number }) {
  const { c } = useTheme();
  const { height } = useWindowDimensions();
  const accent = c.accent[item.kind];

  switch (item.kind) {
    case 'siir':
      return (
        <View>
          <Text style={[styles.title, { color: c.ink }]}>{item.title}</Text>
          <Text style={[styles.by, { color: c.inkSoft }]}>
            {item.author} · {item.years}
          </Text>
          <Text style={[styles.poem, { color: c.ink }]}>{item.text}</Text>
        </View>
      );
    case 'sanat': {
      const imgH = Math.min(width / item.ratio, height * 0.55);
      return (
        <View>
          <View style={[styles.frame, { backgroundColor: c.desk, borderColor: c.line }]}>
            <Image
              source={item.image}
              style={{ width: '100%', height: imgH }}
              contentFit="contain"
              transition={300}
              accessibilityLabel={item.title}
            />
          </View>
          <Text style={[styles.title, styles.artTitle, { color: c.ink }]}>{item.title}</Text>
          <Text style={[styles.by, { color: c.inkSoft }]}>
            {item.artist} · {item.date}
          </Text>
        </View>
      );
    }
    case 'sarki':
      return (
        <View style={styles.center}>
          <VinylIcon size={Math.min(width * 0.62, 240)} ink={c.ink} accent={accent} paper={c.paper} />
          <Text style={[styles.title, styles.centerText, { color: c.ink, marginTop: space.l }]}>{item.title}</Text>
          <Text style={[styles.by, styles.centerText, { color: c.inkSoft }]}>{item.artist}</Text>
          <Pressable
            accessibilityRole="link"
            onPress={() => Linking.openURL(spotifyUrl(item))}
            style={({ pressed }) => [styles.listen, { borderColor: accent, opacity: pressed ? 0.6 : 1 }]}>
            <Text style={[styles.listenText, { color: accent }]}>Spotify&apos;da dinle ↗</Text>
          </Pressable>
        </View>
      );
    case 'kelime':
      return (
        <View>
          <Text style={[styles.kicker, { color: accent }]}>{item.language.toLocaleUpperCase('tr')}</Text>
          <Text style={[styles.word, { color: c.ink }]}>{item.word}</Text>
          <Text style={[styles.meaning, { color: c.ink }]}>{item.meaning}</Text>
        </View>
      );
  }
}

/** Künye ve kürasyon notu; kademeli açılım için panelde gösterilir. */
export function ContentNote({ item }: { item: ContentItem }) {
  const { c } = useTheme();
  const meta =
    item.kind === 'siir'
      ? `${item.title} · ${item.author} (${item.years})`
      : item.kind === 'sanat'
        ? `${item.title} · ${item.artist}, ${item.date} · Art Institute of Chicago, CC0`
        : item.kind === 'sarki'
          ? `${item.title} · ${item.artist}`
          : `${item.word} · ${item.language}`;
  return (
    <View>
      <Text style={[styles.noteKicker, { color: c.inkFaint }]}>KÜNYE</Text>
      <Text style={[styles.meta, { color: c.inkSoft }]}>{meta}</Text>
      <Text style={[styles.note, { color: c.ink }]}>{item.note}</Text>
    </View>
  );
}

export function HeartIcon({ filled, color, size = 24 }: { filled: boolean; color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 20.5s-7.5-4.4-7.5-10.1A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.8c0 5.7-7.5 10.1-7.5 10.1z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center' },
  centerText: { textAlign: 'center' },
  title: { fontFamily: fonts.serifSemi, fontSize: 27, lineHeight: 36 },
  artTitle: { fontSize: 22, lineHeight: 30, marginTop: space.l },
  by: { fontFamily: fonts.ui, fontSize: 15, marginTop: space.xs },
  poem: { fontFamily: fonts.serif, fontSize: 21, lineHeight: 37, marginTop: space.xl },
  frame: { borderRadius: radius.s, borderWidth: 1, padding: space.s },
  listen: {
    marginTop: space.l,
    borderWidth: 1.5,
    borderRadius: 999,
    paddingHorizontal: space.l,
    paddingVertical: 10,
  },
  listenText: { fontFamily: fonts.uiBold, fontSize: 16 },
  kicker: { fontFamily: fonts.uiBold, fontSize: 13, letterSpacing: 2 },
  word: { fontFamily: fonts.serifMedium, fontSize: 54, lineHeight: 68, marginTop: space.s },
  meaning: { fontFamily: fonts.serif, fontSize: 21, lineHeight: 34, marginTop: space.l },
  noteKicker: { fontFamily: fonts.uiBold, fontSize: 12, letterSpacing: 2 },
  meta: { fontFamily: fonts.ui, fontSize: 14, marginTop: space.xs, lineHeight: 20 },
  note: { fontFamily: fonts.serif, fontSize: 18, lineHeight: 30, marginTop: space.m },
});
