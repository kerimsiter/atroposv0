import { type JSX, useState } from 'react'
import Navbar from '@renderer/components/Navbar'
import Sidebar from '@renderer/components/Sidebar'

export default function Home(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="min-h-screen w-full bg-white dark:bg-neutral-900">
      <Navbar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="mx-auto max-w-[1440px] px-4 py-4">
        {/* Placeholder: içerik daha sonra Figma'ya göre doldurulacak */}
        <div className="grid place-items-center rounded-2xl border border-dashed border-neutral-200 p-12 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
          İçerik burada olacak
        </div>
      </main>
    </div>
  )
}
