import { useEffect, useMemo, useState, type JSX } from 'react'
import { useAppStore } from './stores/app.store'
import type { Employee } from '@renderer/types/auth'
import LoginUserSelect from '@renderer/pages/LoginUserSelect'
import LoginPin from '@renderer/pages/LoginPin'
import LoginSuccessModal from '@renderer/components/LoginSuccessModal'
import { getEmployees } from '@renderer/services/api'
import { COMPANY_TAX, BRANCH_CODE } from '@renderer/config'

type Step = 'select' | 'pin' | 'success'

function App(): JSX.Element {
  const { theme, toggleTheme } = useAppStore()
  const [step, setStep] = useState<Step>('select')
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)
  const [successOpen, setSuccessOpen] = useState(false)

  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const selectedEmployee: Employee | undefined = useMemo(
    () => employees.find((e) => e.id === selectedId),
    [employees, selectedId],
  )

  // Load employees from backend
  useEffect(() => {
    let mounted = true
    setLoading(true)
    setError(null)
    getEmployees({ companyTax: COMPANY_TAX, branchCode: BRANCH_CODE })
      .then((list) => {
        if (!mounted) return
        setEmployees(list)
      })
      .catch((e) => {
        console.error(e)
        if (mounted) setError('Çalışanlar yüklenemedi')
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  // Sync theme to <html> class for Tailwind dark mode
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
  }, [theme])

  return (
    <div className="relative">
      {/* Simple theme toggle button for demo */}
      <button
        onClick={toggleTheme}
        className="absolute right-4 top-4 rounded-full border border-neutral-200 bg-white px-3 py-1 text-sm shadow"
      >
        Theme: {theme}
      </button>

      {step === 'select' && (
        <LoginUserSelect
          employees={employees}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onContinue={() => setStep('pin')}
        />
      )}

      {loading && <div className="absolute inset-x-0 top-4 mx-auto w-max rounded bg-white px-3 py-1 text-sm text-neutral-700 shadow">Yükleniyor...</div>}
      {error && (
        <div
          className="absolute inset-x-0 top-4 mx-auto w-max rounded bg-error-500 px-3 py-1 text-sm text-white shadow"
        >
          {error}
        </div>
      )}

      {step === 'pin' && (
        <LoginPin
          employee={selectedEmployee}
          onBack={() => setStep('select')}
          onSuccess={() => {
            setStep('success')
            setSuccessOpen(true)
          }}
        />
      )}

      <LoginSuccessModal
        open={step === 'success' && successOpen}
        onClose={() => setSuccessOpen(false)}
        employeeName={selectedEmployee?.name}
        onStartShift={() => {
          setSuccessOpen(false)
        }}
      />
    </div>
  )
}

export default App
