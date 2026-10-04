import type { ConfigContext, ExpoConfig } from 'expo/config';

// app.json'daki ayarlar aynen kalır. GitHub Pages'te site /saran-tracker/ alt yolunda
// yayınlandığı için web derlemesi EXPO_BASE_URL ile o yola göre üretilir; yerelde boş.
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...(config as ExpoConfig),
  experiments: {
    ...config.experiments,
    baseUrl: process.env.EXPO_BASE_URL ?? '',
  },
});
