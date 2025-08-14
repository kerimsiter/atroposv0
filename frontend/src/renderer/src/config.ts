// Backend entegrasyonu için varsayılan şirket/şube (env ile override edilebilir)
export const COMPANY_TAX = (import.meta as any).env?.VITE_COMPANY_TAX ?? '1111111111'
export const BRANCH_CODE = (import.meta as any).env?.VITE_BRANCH_CODE ?? 'IST01'
