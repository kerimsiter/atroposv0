import { type JSX } from 'react'

interface Props {
  title?: string
  subtitle?: string
}

// Use user-provided image under frontend/resources
// Path from this file: components -> ../../../.. -> frontend, then /resources
// electron-vite/vite will handle asset bundling
// If this import fails, consider moving the image to renderer/src/assets and updating the path accordingly.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import bgImageUrl from '../../../../resources/bg-image.jpg'

export default function HeroBackground({ title = 'Effortlessly Manage Sales and Inventory', subtitle = 'Track sales and manage inventory in real-time. Stay in control and never miss a beat.' }: Props): JSX.Element {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      />

      {/* Bottom vignette for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />

      {/* Bottom-left text with gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),transparent)] dark:bg-[linear-gradient(to_top,rgba(0,0,0,0.55),transparent)]" />
      <div className="pointer-events-none absolute bottom-6 left-6 max-w-xl text-white drop-shadow-md">
        <div className="text-2xl font-semibold">{title}</div>
        <div className="text-sm opacity-90">{subtitle}</div>
      </div>
    </div>
  )
}
