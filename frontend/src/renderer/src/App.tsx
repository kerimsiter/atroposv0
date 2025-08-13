import { useState, type JSX } from 'react'
import { useAppStore } from './stores/app.store'

function App(): JSX.Element {
  const [apiStatus, setApiStatus] = useState<string>('henüz kontrol edilmedi')
  const { theme, toggleTheme } = useAppStore()

  const checkApiHealth = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:3000/api/health')
      if (!response.ok) {
        throw new Error(`HTTP hatası! durum: ${response.status}`)
      }
      const data = await response.json()
      setApiStatus(data.status)
    } catch (error) {
      console.error('API durumu alınırken hata oluştu:', error)
      setApiStatus('hata')
    }
  }

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">Atropos</h1>
      <div className="p-4 mb-4 border rounded">
        <h2 className="mb-2 text-xl font-semibold">Entegrasyon Testi</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={checkApiHealth}
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          >
            API Durumunu Kontrol Et
          </button>
          <p>
            API Durumu: <span className="font-semibold">{apiStatus}</span>
          </p>
        </div>
      </div>

      <div className="p-4 border rounded">
        <h2 className="mb-2 text-xl font-semibold">Zustand Tema Yönetimi</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="px-4 py-2 font-bold text-white bg-purple-500 rounded hover:bg-purple-700"
          >
            Temayı Değiştir
          </button>
          <p>
            Mevcut Tema: <span className="font-semibold">{theme}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default App