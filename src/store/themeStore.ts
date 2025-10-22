import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeStore {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  isLoaded: boolean;
  setTheme: (theme: Theme) => void;
  initializeTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'system',
      resolvedTheme: 'light',
      isLoaded: false,

      setTheme: (newTheme: Theme) => {
        set({ theme: newTheme });

        // Apply theme to document
        const applyTheme = () => {
          const root = document.documentElement;
          root.classList.remove('light', 'dark');

          let resolvedTheme: 'light' | 'dark';

          if (newTheme === 'system') {
            const systemTheme = window.matchMedia(
              '(prefers-color-scheme: dark)'
            ).matches
              ? 'dark'
              : 'light';
            root.classList.add(systemTheme);
            resolvedTheme = systemTheme;
          } else {
            root.classList.add(newTheme);
            resolvedTheme = newTheme;
          }

          set({ resolvedTheme });
        };

        // Apply immediately if on client
        if (typeof window !== 'undefined') {
          applyTheme();
        }
      },

      initializeTheme: () => {
        if (typeof window === 'undefined') {
          set({ isLoaded: true });
          return;
        }

        const { theme } = get();
        const root = document.documentElement;
        root.classList.remove('light', 'dark');

        let resolvedTheme: 'light' | 'dark';

        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
            .matches
            ? 'dark'
            : 'light';
          root.classList.add(systemTheme);
          resolvedTheme = systemTheme;
        } else {
          root.classList.add(theme);
          resolvedTheme = theme;
        }

        set({ resolvedTheme, isLoaded: true });

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
          const currentTheme = get().theme;
          if (currentTheme === 'system') {
            const root = document.documentElement;
            root.classList.remove('light', 'dark');
            const newTheme = mediaQuery.matches ? 'dark' : 'light';
            root.classList.add(newTheme);
            set({ resolvedTheme: newTheme });
          }
        };

        mediaQuery.addEventListener('change', handleChange);

        // Return cleanup function
        return () => mediaQuery.removeEventListener('change', handleChange);
      },
    }),
    {
      name: 'theme-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({ theme: state.theme }),
      onRehydrateStorage: () => state => {
        // This runs after the state has been rehydrated from localStorage
        if (state) {
          state.isLoaded = false; // Will be set to true by initializeTheme
        }
      },
    }
  )
);

// Export the theme type for use in other components
export type { Theme };
