import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Locale, defaultLocale } from '@/i18n/config';

interface StoreState {
  locale: Locale;
  setLocale: (locale: Locale) => void;

  // Theme
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;

  // Navigation
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;

  // Modal states
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (isOpen: boolean) => void;

  isContactModalOpen: boolean;
  setIsContactModalOpen: (isOpen: boolean) => void;

  // Homepage view mode (lite = current minimal layout, full = full commerce sections)
  viewMode: 'lite' | 'full';
  setViewMode: (mode: 'lite' | 'full') => void;

  // Persisted demo map speed selection (0.5x / 1x / 2x)
  lastSpeed: number;
  setLastSpeed: (speed: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Locale
      locale: defaultLocale,
      setLocale: (locale) => set({ locale }),

      // Theme
      theme: 'dark',
      setTheme: (theme) => set({ theme }),

      // Navigation
      isMenuOpen: false,
      setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),

      // Modals
      isDemoModalOpen: false,
      setIsDemoModalOpen: (isDemoModalOpen) => set({ isDemoModalOpen }),

      isContactModalOpen: false,
      setIsContactModalOpen: (isContactModalOpen) => set({ isContactModalOpen }),

      // View mode default = lite (matches current minimal homepage)
      viewMode: 'lite',
      setViewMode: (viewMode) => set({ viewMode }),

      // Speed default = 1x
      lastSpeed: 1,
      setLastSpeed: (lastSpeed) => set({ lastSpeed }),
    }),
    {
      name: 'kpatrol-storage',
      partialize: (state) => ({
        locale: state.locale,
        theme: state.theme,
        viewMode: state.viewMode,
        lastSpeed: state.lastSpeed,
      }),
    }
  )
);
