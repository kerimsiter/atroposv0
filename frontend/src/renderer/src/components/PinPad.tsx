import { useEffect, useRef, useState, type JSX } from 'react'

interface Props {
  length?: number
  onSubmit: (pin: string) => void
  onBack?: () => void
}

export default function PinPad({ length = 4, onSubmit, onBack }: Props): JSX.Element {
  const [value, setValue] = useState('')
  const valueRef = useRef(value)
  useEffect(() => { valueRef.current = value }, [value])

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key >= '0' && e.key <= '9') {
        press(e.key)
      } else if (e.key === 'Backspace') {
        press('backspace')
      } else if (e.key === 'Enter') {
        if (valueRef.current.length === length) onSubmit(valueRef.current)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [length, onSubmit])

  const digits = ['1','2','3','4','5','6','7','8','9','0']

  return (
    <div className="w-full">
      {/* Keyboard support: digits/backspace/enter (attached once) */}
      <div className="mb-6 flex justify-center gap-3">
        {Array.from({ length }).map((_, i) => (
          <div
            key={i}
            className={
              'h-4 w-4 rounded-full ' +
              (i < value.length
                ? 'bg-primary-500'
                : 'border border-neutral-200 bg-transparent dark:border-neutral-700')
            }
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {digits.slice(0,9).map((d) => (
          <button key={d} onClick={() => press(d)} className="btn btn-outline py-4 text-lg font-medium">{d}</button>
        ))}
        <button onClick={onBack} className="btn btn-outline py-4 text-lg">←</button>
        <button onClick={() => press('0')} className="btn btn-outline py-4 text-lg font-medium">0</button>
        <button onClick={() => press('backspace')} className="btn btn-outline py-4 text-lg">⌫</button>
      </div>
      <button onClick={confirm} disabled={value.length !== length} className="btn btn-primary mt-4 w-full disabled:opacity-50">Login</button>
    </div>
  )
}
