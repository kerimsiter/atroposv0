/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind tarama yolları: renderer altındaki html/tsx de dahil
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
    './src/renderer/index.html',
    './src/renderer/**/*.{js,ts,jsx,tsx,html}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        // Figma tipografi: yalnızca Plus Jakarta Sans
        sans: ['Plus Jakarta Sans'],
      },
      colors: {
        white: '#FFFFFF',
        neutral: {
          50: '#FAFAFA',
          100: '#F7F7F7',
          200: '#E5E5E5',
          300: '#D7D7D7',
          400: '#A3A3A3',
          500: '#757575',
          600: '#525252',
          700: '#464646',
          800: '#282828',
          900: '#141414',
        },
        primary: {
          50: '#F2FAF7',
          100: '#DAF4E6',
          200: '#BEEDD2',
          300: '#99E4B8',
          400: '#6AD896',
          500: '#34CB6F',
          600: '#2EB362',
          700: '#289E56',
          800: '#218347',
          900: '#1A6637',
        },
        info: {
          100: '#E8F4FF',
          200: '#B9DDFE',
          300: '#68B5FC',
          400: '#4AA6FC',
          500: '#1D90FB',
        },
        warning: {
          100: '#FFF7E6',
          200: '#FFE5B0',
          300: '#FFC754',
          400: '#FFBC33',
          500: '#FFAB00',
        },
        error: {
          100: '#FEEDEA',
          200: '#FAC8BC',
          300: '#F5886F',
          400: '#F37153',
          500: '#F04D28',
        },
      },
      boxShadow: {
        card: '0 10px 24px rgba(20,20,20,0.08)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.btn': {
          '@apply inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2':
            {},
        },
        '.btn-primary': {
          background: 'linear-gradient(90deg, ' + theme('colors.primary.600') + ' 0%, ' + theme('colors.primary.700') + ' 100%)',
          color: theme('colors.white'),
          boxShadow: theme('boxShadow.card'),
          '@apply hover:opacity-95 active:opacity-90': {},
        },
        '.btn-outline': {
          '@apply border border-neutral-200 text-neutral-800 bg-white hover:bg-neutral-100': {},
        },
        '.input': {
          '@apply w-full rounded-xl border border-neutral-200 bg-white px-5 py-4 text-[14px] text-neutral-500 placeholder-neutral-500 focus:border-primary-400 focus:ring-0':
            {},
        },
        '.link': {
          '@apply text-primary-700 hover:opacity-90': {},
        },
      })
    },
  ],
}
