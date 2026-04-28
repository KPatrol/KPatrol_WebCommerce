'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n/config';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { locale, setLocale } = useStore();

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl',
          'bg-slate-900/60 backdrop-blur-md hover:bg-cyan-500/10',
          'ring-1 ring-cyan-500/20 hover:ring-cyan-400/55',
          'transition-all duration-200',
          'text-cyan-100 hover:text-white'
        )}
        aria-label="Change language"
      >
        <Globe className="h-4 w-4 text-cyan-300 shrink-0" />
        <span className="text-sm font-medium whitespace-nowrap">
          {localeFlags[locale]} {localeNames[locale]}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className={cn(
                'absolute right-0 top-full mt-2 z-50',
                'w-48 py-2 rounded-2xl',
                'bg-slate-900/90 backdrop-blur-xl',
                'ring-1 ring-cyan-500/25',
                'shadow-[0_0_28px_rgba(34,211,238,0.18)]'
              )}
            >
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3',
                    'px-4 py-2.5',
                    'hover:bg-cyan-500/10',
                    'transition-colors duration-150',
                    locale === loc
                      ? 'text-cyan-300'
                      : 'text-slate-300 hover:text-white'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{localeFlags[loc]}</span>
                    <span className="text-sm font-medium">
                      {localeNames[loc]}
                    </span>
                  </div>
                  {locale === loc && (
                    <Check className="h-4 w-4 text-cyan-300" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
