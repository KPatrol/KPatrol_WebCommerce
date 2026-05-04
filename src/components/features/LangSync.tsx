'use client';

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';

export function LangSync() {
  const locale = useStore((state) => state.locale);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
