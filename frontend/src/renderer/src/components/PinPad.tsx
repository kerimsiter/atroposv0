import { useEffect, useState, type JSX } from 'react'

interface Props {
  length?: number
  onSubmit: (pin: string) => void
  onBack?: () => void
}

export default function PinPad({ length = 4, onSubmit, onBack }: Props): JSX.Element {
  const [value, setValue] = useState('')

  const press = (d: string): void => {
    if (d === 'backspace') {
      setValue((v) => v.slice(0, -1))
      return
    }
    setValue((v) => (v.length < length ? v + d : v))
  }
  const confirm = (): void => {
    if (value.length === length) onSubmit(value)
  }

  const digits = ['1','2','3','4','5','6','7','8','9','0']

  return (
    <div className="w-full">
      {/* Keyboard support: digits/backspace/enter */}
      {(() => {
        // attach once when component mounts
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          const onKey = (e: KeyboardEvent): void => {
            if (e.key >= '0' && e.key <= '9') {
              press(e.key)
            } else if (e.key === 'Backspace') {
              press('backspace')
            } else if (e.key === 'Enter') {
              confirm()
            }
          }
          window.addEventListener('keydown', onKey)
          return () => window.removeEventListener('keydown', onKey)
        }, [value, length])
        return null
      })()}
      <div className="mb-6 flex justify-center gap-3">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={
              'h-4 w-4 rounded-full ' +
              (i < value.length
                ? 'bg-[var(--color-primary)]'
                : 'border border-[var(--color-border)] bg-transparent')
            }
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {digits.slice(0,9).map((d) => (
          <button key={d} onClick={() => press(d)} className="rounded-xl border border-[var(--color-border)] py-4 text-lg font-medium shadow-sm hover:bg-[var(--color-bg-muted)]">{d}</button>
        ))}
        <button onClick={onBack} className="rounded-xl border border-[var(--color-border)] py-4 text-lg shadow-sm">←</button>
        <button onClick={() => press('0')} className="rounded-xl border border-[var(--color-border)] py-4 text-lg font-medium shadow-sm hover:bg-[var(--color-bg-muted)]">0</button>
        <button onClick={() => press('backspace')} className="rounded-xl border border-[var(--color-border)] py-4 text-lg shadow-sm">⌫</button>
      </div>
      <button onClick={confirm} disabled={value.length !== length} className="btn-primary mt-4 w-full rounded-full px-6 py-3 font-medium disabled:opacity-50">Login</button>
    </div>
  )
}
