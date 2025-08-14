import { useState, type JSX } from 'react'
import type { Employee } from '@renderer/types/auth'
import PinPad from '@renderer/components/PinPad'
import HeroBackground from '@renderer/components/HeroBackground'
import { verifyPin } from '@renderer/services/api'
import { COMPANY_TAX, BRANCH_CODE } from '@renderer/config'

interface Props {
  employee?: Employee
  onBack: () => void
  onSuccess: () => void
}

export default function LoginPin({ employee, onBack, onSuccess }: Props): JSX.Element {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (pin: string): Promise<void> => {
    if (!employee) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await verifyPin({
        companyTax: COMPANY_TAX,
        branchCode: BRANCH_CODE,
        userId: employee.id,
        pin,
      })
      if (res.ok) onSuccess()
    } catch (e: any) {
      console.error(e)
      setError('PIN doğrulanamadı')
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className="relative h-screen w-full">
      <HeroBackground />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-end p-8">
        <div className="pointer-events-auto w-full max-w-md rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl backdrop-blur-lg">
          <h2 className="mb-1 text-2xl font-semibold">Enter PIN</h2>
          <p className="mb-4 text-sm text-muted">{employee ? `Employee: ${employee.name}` : 'Select employee first'}</p>
          {error && <div className="mb-3 rounded px-3 py-2 text-sm" style={{ background: 'var(--color-danger)', color: 'var(--color-primary-contrast)' }}>{error}</div>}
          <div className={submitting ? 'opacity-60 pointer-events-none' : ''}>
            <PinPad onBack={onBack} onSubmit={handleSubmit} />
          </div>
          {submitting && <div className="mt-3 text-center text-sm text-muted">Doğrulanıyor...</div>}
        </div>
      </div>
    </div>
  )
}
