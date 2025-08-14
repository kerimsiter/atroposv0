import { type JSX, useEffect, useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  onStartShift?: () => void
  employeeName?: string
  avatarUrl?: string
}

export default function LoginSuccessModal({ open, onClose, onStartShift, employeeName, avatarUrl }: Props): JSX.Element | null {
  if (!open) return null
  const [now, setNow] = useState<Date>(new Date())

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  // Force English design format
  const hours = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', hour12: false }).format(now)
  const minutes = new Intl.DateTimeFormat('en-GB', { minute: '2-digit' }).format(now)
  const date = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(now)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-[460px] rounded-[20px] border border-neutral-200 bg-white p-6 text-center shadow-2xl dark:border-neutral-700 dark:bg-neutral-800">
        {/* Avatar */}
        <div className="mx-auto -mt-12 mb-3 h-20 w-20 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 shadow-sm dark:border-neutral-600 dark:bg-neutral-700">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <div className="grid h-full w-full place-items-center text-2xl font-semibold text-neutral-800">
              {(employeeName ?? 'User').charAt(0)}
            </div>
          )}
        </div>
        {/* Title & Subtitle */}
        <h2 className="mb-1 text-xl font-semibold text-neutral-900 dark:text-neutral-100">Welcome{employeeName ? `, ${employeeName}` : ''}!</h2>
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">Ready to clock in and begin your day? Choose when you’d like to clock in.</p>

        {/* Status section */}
        <div className="mb-4 rounded-xl border border-neutral-200 bg-neutral-100 p-4 text-left dark:border-neutral-700 dark:bg-neutral-900">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">Status :</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-error-100 px-3 py-1 text-xs font-medium text-error-500">
              <span className="inline-block h-3 w-3 rounded-full bg-gradient-to-br from-[#F04D28] to-[#AA371C]" />
              Clock Out
            </span>
          </div>
          <div className="text-center">
            <div className="text-[46px] font-bold leading-[54px] text-neutral-900 dark:text-neutral-100">
              <span>{hours}</span>
              <span className="px-2">:</span>
              <span>{minutes}</span>
            </div>
            <div className="text-sm font-medium text-neutral-800 dark:text-neutral-300">{date}</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-neutral-200 px-[22px] py-[11px] text-[16px] font-semibold text-neutral-800 shadow-sm dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
          >
            Later
          </button>
          <button
            onClick={onStartShift}
            className="btn btn-primary w-[180px] rounded-xl px-[22px] py-[11px] text-[16px] font-semibold shadow"
          >
            Clock In Now
          </button>
        </div>
      </div>
    </div>
  )
}
