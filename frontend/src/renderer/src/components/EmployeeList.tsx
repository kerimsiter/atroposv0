import { type JSX } from 'react'
import type { Employee } from '@renderer/types/auth'

interface Props {
  employees: Employee[]
  selectedId?: string
  onSelect: (id: string) => void
}

export default function EmployeeList({ employees, selectedId, onSelect }: Props): JSX.Element {
  return (
    <div className="space-y-3">
      {employees.map((e) => (
        <button
          key={e.id}
          onClick={() => onSelect(e.id)}
          className={
            'flex w-full items-center justify-between rounded-2xl border px-4 py-3 shadow-sm transition ' +
            (selectedId === e.id
              ? 'border-primary-500 ring-2 ring-primary-500/25'
              : 'border-neutral-200 hover:border-primary-500/50')
          }
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full grid place-items-center bg-primary-500 text-white">
              {(e.name ?? '?').charAt(0)}
            </div>
            <div className="text-left">
              <div className="font-medium">{e.name}</div>
              {e.shift && <div className="text-xs text-neutral-500">{e.shift}</div>}
            </div>
          </div>
          <div className="text-sm text-neutral-500">{selectedId === e.id ? 'Selected' : ''}</div>
        </button>
      ))}
    </div>
  )
}
