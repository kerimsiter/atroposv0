import { type JSX } from 'react'

interface Props {
  onMenuClick?: () => void
}

// Figma Top Bar: Sol hamburger, logo + marka, ortada arama
// Renkler Tailwind paletinden; dark uyumlu.
export default function Navbar({ onMenuClick }: Props): JSX.Element {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center gap-3 px-4">
        {/* Left Section (fixed width) */}
        <div className="flex w-[220px] items-center gap-2">
          <button
            onClick={onMenuClick}
            aria-label="Open menu"
            className="grid size-10 place-items-center rounded-lg hover:bg-neutral-100 active:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            {/* Hamburger icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-800 dark:text-neutral-100">
              <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="grid size-6 place-items-center rounded-[6px] bg-gradient-to-br from-primary-600 to-primary-700">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H11L11 22L21 10H13L13 2Z" fill="white"/>
              </svg>
            </div>
            <span className="text-[18px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">Atropos</span>
          </div>
        </div>

        {/* Center Section (search) */}
        <div className="flex min-w-0 flex-1 justify-center">
          <div className="relative w-full max-w-[560px] sm:max-w-[600px] md:max-w-[680px]">
            <span className="pointer-events-none absolute inset-y-0 left-3 grid place-items-center text-neutral-500">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M20 20L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <input
              className="input h-[44px] w-full pl-10 pr-3 text-[14px] placeholder-neutral-500"
              placeholder="Search Product..."
            />
          </div>
        </div>

        {/* Right Section (fixed width to balance center) */}
        <div className="hidden w-[220px] items-center justify-end gap-2 md:flex">
          {/* İleride: quick actions (profile, notifications, vs.) */}
        </div>
      </div>
    </header>
  )
}
