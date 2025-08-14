import { type JSX } from 'react'
import type { Employee } from '@renderer/types/auth'
import EmployeeDropdown from '@renderer/components/EmployeeDropdown'
import HeroBackground from '@renderer/components/HeroBackground'

interface Props {
  employees: Employee[]
  selectedId?: string
  onSelect: (id: string) => void
  onContinue: () => void
}

export default function LoginUserSelect({ employees, selectedId, onSelect, onContinue }: Props): JSX.Element {
  return (
    <div className="relative h-screen w-full">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end p-8">
        <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl backdrop-blur-lg">
          <h2 className="mb-1 text-2xl font-semibold">Hi, Welcome</h2>
          <p className="mb-4 text-sm text-muted">Please login to employee account</p>
          <div className="mb-4">
            <EmployeeDropdown employees={employees} selectedId={selectedId} onSelect={onSelect} />
          </div>
          <button
            className="btn-primary w-full rounded-full px-6 py-3 font-medium disabled:opacity-50"
            onClick={onContinue}
            disabled={!selectedId}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  )
}
