import { useThemeStore } from '@/store/themeStore'

export const useTheme = () => {
  const { theme, toggle } = useThemeStore()

  return {
    theme,
    toggle,
    isPacman: theme === 'pacman',
    isChess:  theme === 'chess',
  }
}