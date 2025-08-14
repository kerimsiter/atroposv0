export type EmployeeDTO = { id: string; name: string; avatarUrl?: string; shift?: string }

const BASE_URL = 'http://localhost:3000/api'

export async function getEmployees(params: {
  companyTax: string
  branchCode?: string
}): Promise<EmployeeDTO[]> {
  const url = new URL(BASE_URL + '/users')
  url.searchParams.set('companyTax', params.companyTax)
  if (params.branchCode) url.searchParams.set('branchCode', params.branchCode)
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`getEmployees http ${res.status}`)
  return await res.json()
}

export async function verifyPin(params: {
  companyTax: string
  branchCode?: string
  userId: string
  pin: string
}): Promise<{ ok: true; userId: string; sessionToken: string }> {
  const res = await fetch(BASE_URL + '/auth/pin-verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`verifyPin http ${res.status} ${text}`)
  }
  return await res.json()
}
