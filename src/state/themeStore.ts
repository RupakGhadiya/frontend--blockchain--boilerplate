import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  return {
    theme: savedTheme,
    setTheme: (theme) => {
      localStorage.setItem('theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      set({ theme });
    },
    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        return { theme: newTheme };
      }),
  };
});
