import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface AppState {
  theme: Theme
  toggleTheme: () => void
}

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem('theme') as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
  } catch {}
  return 'light'
}

export const useAppStore = create<AppState>((set, get) => ({
  theme: getInitialTheme(),
  toggleTheme: () => {
    const next = get().theme === 'light' ? 'dark' : 'light'
    try {
      localStorage.setItem('theme', next)
    } catch {}
    set({ theme: next })
  },
}))
