import { useStore } from '@/store/useStore';
import viMessages from '@/i18n/messages/vi.json';
import enMessages from '@/i18n/messages/en.json';

const messages = {
  vi: viMessages,
  en: enMessages,
};

function resolve(tree: any, key: string) {
  const keys = key.split('.');
  let value: any = tree;
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return undefined;
    }
  }
  return value;
}

export function useTranslations() {
  const locale = useStore((state) => state.locale);

  const t = (key: string): string => {
    const value = resolve(messages[locale], key);
    if (typeof value === 'string') return value;
    if (value === undefined) console.warn(`Translation key not found: ${key}`);
    return key;
  };

  // Return raw value (arrays, objects) at `key`. Falls back to [] when missing.
  const tArray = <T = any>(key: string): T[] => {
    const value = resolve(messages[locale], key);
    return Array.isArray(value) ? (value as T[]) : [];
  };

  return { t, tArray, locale };
}
