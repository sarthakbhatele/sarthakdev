import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'pacman' | 'chess'

interface ThemeStore {
  theme: Theme
  toggle: () => void
}

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: 'pacman',
      toggle: () => {
        const next: Theme = get().theme === 'pacman' ? 'chess' : 'pacman'
        applyTheme(next)
        set({ theme: next })
      },
    }),
    {
      name: 'sarthak-portfolio-theme',
      onRehydrateStorage: () => (state) => {
        if (state?.theme) applyTheme(state.theme)
      },
    }
  )
)