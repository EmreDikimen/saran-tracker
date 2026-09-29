import { useEffect, useState } from 'react';

import { useAppStore } from '@/store/useAppStore';

/** Dev paneldeki zaman kaydırmasını da hesaba katan, belirli aralıkla yenilenen saat. */
export function useNow(tickMs = 1000): number {
  const offset = useAppStore((s) => s.timeOffset);
  const [real, setReal] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setReal(Date.now()), tickMs);
    return () => clearInterval(t);
  }, [tickMs]);
  return real + offset;
}
