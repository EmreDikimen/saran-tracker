import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Web'de titreşim yok; çağrılar sessizce atlanır.
const enabled = Platform.OS !== 'web';

export const haptic = {
  tap: () => enabled && Haptics.selectionAsync().catch(() => {}),
  done: () => enabled && Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {}),
  reward: () =>
    enabled && Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {}),
};
