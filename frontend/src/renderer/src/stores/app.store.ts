import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
  toggleTheme: () => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
}))
