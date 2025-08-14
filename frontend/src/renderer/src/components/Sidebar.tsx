import { type JSX } from 'react'

interface NavItem {
  key: string
  label: string
  icon: JSX.Element
}

interface Props {
  open: boolean
  onClose: () => void
  activeKey?: string
}

const items: NavItem[] = [
  { key: 'pos', label: 'Point of Sale', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="3" y="11" width="18" height="10" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) },
  { key: 'order', label: 'Order', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <path d="M6 7h12M6 12h12M6 17h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) },
  { key: 'customer', label: 'Customer', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) },
  { key: 'tables', label: 'Tables', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <rect x="3" y="7" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 11v6M18 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) },
  { key: 'product', label: 'Product', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <path d="M12 3 3 7l9 4 9-4-9-4Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="m3 7 9 4v10L3 17V7Zm18 0-9 4v10l9-4V7Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) },
  { key: 'report', label: 'Report', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <path d="M6 20V10M12 20V4M18 20v-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ) },
  { key: 'inventory', label: 'Inventory', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8h8v8H8V8Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) },
  { key: 'setting', label: 'Setting', icon: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82 2 2 0 1 1-3.31 0A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-.6 1l-.02.08a2 2 0 1 1-3.31-1.82l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33 2 2 0 1 1 0-3.31A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6c.34 0 .67-.12.94-.33.28-.22.49-.52.6-.86a2 2 0 1 1 3.31 0c.11.34.32.64.6.86.27.2.6.33.94.33.52 0 1.02-.2 1.39-.57l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06c-.38.38-.59.87-.57 1.39.02.34.14.67.33.94.22.28.52.49.86.6a2 2 0 1 1 0 3.31c-.34.11-.64.32-.86.6-.2.27-.33.6-.33.94Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) },
]

export default function Sidebar({ open, onClose, activeKey = 'pos' }: Props): JSX.Element | null {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Panel */}
      <aside className="absolute left-2 top-2 bottom-2 w-[340px] rounded-3xl border border-neutral-200 bg-neutral-100 p-4 shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-[8px] bg-gradient-to-br from-primary-600 to-primary-700">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H11L11 22L21 10H13L13 2Z" fill="white"/>
              </svg>
            </div>
            <span className="text-[18px] font-semibold text-neutral-900 dark:text-neutral-100">Atropos</span>
          </div>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-lg hover:bg-neutral-200/60 dark:hover:bg-neutral-700" aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-neutral-700 dark:text-neutral-300">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex flex-col gap-2">
          {items.map((it) => {
            const active = it.key === activeKey
            return (
              <button key={it.key} className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition ${
                active
                  ? 'bg-gradient-to-b from-neutral-800 to-neutral-700 text-white shadow dark:from-neutral-700 dark:to-neutral-600'
                  : 'text-neutral-800 hover:bg-neutral-200/70 dark:text-neutral-100 dark:hover:bg-neutral-700'
              }`}>
                <span className={active ? 'text-white' : ''}>{it.icon}</span>
                <span className={`text-[15px] font-medium ${active ? 'text-white' : ''}`}>{it.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer actions */}
        <div className="mt-auto flex flex-col gap-4 p-2">
          <button className="flex items-center gap-3 rounded-xl px-3 py-2 text-neutral-700 hover:bg-neutral-200/70 dark:text-neutral-300 dark:hover:bg-neutral-700">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M13 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className="text-[15px]">Logout</span>
          </button>

          {/* User card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm dark:border-neutral-600 dark:bg-neutral-700">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-300" />
              <div className="flex-1">
                <div className="text-[14px] font-semibold text-neutral-900 dark:text-neutral-100">Brian Susanto</div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-300">JS002T</div>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-[12px] font-medium text-primary-700 dark:bg-primary-800/30 dark:text-primary-300">
                <span className="h-2 w-2 rounded-full bg-primary-500" />
                Clock In
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
