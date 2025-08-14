import { useEffect, useMemo, useRef, useState, type JSX } from 'react'
import type { Employee } from '@renderer/types/auth'

interface Props {
  employees: Employee[]
  selectedId?: string
  onSelect: (id: string) => void
  placeholder?: string
  disabled?: boolean
}

export default function EmployeeDropdown({ employees, selectedId, onSelect, placeholder = 'Select employee', disabled = false }: Props): JSX.Element {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState<number>(-1)
  const btnRef = useRef<HTMLButtonElement | null>(null)
  const listRef = useRef<HTMLDivElement | null>(null)

  const selected = useMemo(() => employees.find((e) => e.id === selectedId), [employees, selectedId])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return employees
    return employees.filter((e) => (e.name || '').toLowerCase().includes(q))
  }, [employees, query])

  useEffect(() => {
    const onDocClick = (e: MouseEvent): void => {
      if (!open) return
      const t = e.target as Node
      if (btnRef.current?.contains(t) || listRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIndex((i) => Math.min((i < 0 ? 0 : i + 1), Math.max(0, filtered.length - 1)))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIndex((i) => Math.max(0, (i <= 0 ? 0 : i - 1)))
      } else if (e.key === 'Enter') {
        if (activeIndex >= 0 && activeIndex < filtered.length) {
          const pick = filtered[activeIndex]
          if (pick) { onSelect(pick.id); setOpen(false) }
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, activeIndex, filtered, onSelect])

  useEffect(() => {
    if (activeIndex >= 0) {
      const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-index="${activeIndex}"]`)
      el?.scrollIntoView({ block: 'nearest' })
    }
  }, [activeIndex])

  return (
    <div className="relative">
      <button
        ref={btnRef}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-left shadow-sm hover:border-primary-500/50 dark:border-neutral-700 dark:bg-neutral-800"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full grid place-items-center bg-primary-500 text-white">
            {(selected?.name ?? '?').charAt(0)}
          </div>
          <div className="flex-1">
            <div className="font-medium text-neutral-900 dark:text-neutral-100">{selected?.name || placeholder}</div>
            <div className="text-xs text-neutral-500 dark:text-neutral-400">{selected ? 'Selected' : 'Choose an employee'}</div>
          </div>
        </div>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div
          ref={listRef}
          className="absolute z-20 mt-2 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800"
          role="listbox"
        >
          <div className="p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveIndex(0) }}
              placeholder="Search…"
              className="w-full rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary-400 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 placeholder-neutral-500 dark:placeholder-neutral-500"
            />
          </div>
          <div className="max-h-60 overflow-auto p-1">
            {filtered.map((e, idx) => (
              <button
                key={e.id}
                data-index={idx}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => { onSelect(e.id); setOpen(false) }}
                className={
                  'flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition ' +
                  (selectedId === e.id
                    ? 'bg-primary-500/10'
                    : 'hover:bg-primary-500/10')
                }
                role="option"
                aria-selected={selectedId === e.id}
              >
                <div className="h-8 w-8 rounded-full grid place-items-center bg-primary-500 text-white">
                  {(e.name ?? '?').charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">{e.name}</div>
                  {e.shift && <div className="text-xs text-neutral-500 dark:text-neutral-400">{e.shift}</div>}
                </div>
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
