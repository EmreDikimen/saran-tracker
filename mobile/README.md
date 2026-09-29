# saran (mobil)

Expo SDK 57 + Expo Router. Aynı kod iOS, Android ve web'de çalışır.

```bash
npm install
npx expo start --lan --port 8085   # telefonda aç (bkz. ana README)
npm test                           # fincan, puzzle, seri kuralları
npm run typecheck
npx expo lint
```

## Yapı

| Klasör | İçerik |
| --- | --- |
| `src/app/` | Ekranlar: masa (`index`), oturum (`session/[category]`), `archive` |
| `src/domain/` | Saf mekanik kuralları: `cups`, `puzzle`, `streak`. UI'dan bağımsız, testli |
| `src/store/` | Zustand store (AsyncStorage ile kalıcı) |
| `src/content/` | Kamu malı şiirler, CC0 tablolar (`assets/art/`), kelimeler, şarkılar |
| `src/components/` | Fincanlar, puzzle tahtası, masa objeleri (SVG), alt panel |
| `src/theme/` | Renk, font ve boşluk token'ları (açık ve karanlık tema) |
| `src/dev/` | Prototip paneli: zamanı ileri sarma, tabloyu doldurma, sıfırlama |
