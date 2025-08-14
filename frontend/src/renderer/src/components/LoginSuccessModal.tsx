import { type JSX } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  onStartShift?: () => void
}

export default function LoginSuccessModal({ open, onClose, onStartShift }: Props): JSX.Element | null {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[420px] rounded-2xl p-8 text-center shadow-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-[var(--color-primary)] text-[var(--color-primary-contrast)]">
          ✓
        </div>
        <h2 className="mb-2 text-2xl font-semibold">Login Successful</h2>
        <p className="mb-6 text-muted">Let’s get started and take your customer engagement to the next level!</p>
        <button
          className="btn-primary w-full rounded-full px-6 py-3 font-medium shadow hover:opacity-95"
          onClick={onStartShift}
        >
          Start Shift
        </button>
        <button className="mt-3 text-sm text-muted hover:opacity-90" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  )
}
