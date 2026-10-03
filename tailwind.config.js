/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          300: '#86EFAC',
          400: '#4ADE80',
          500: '#22C55E',
          600: '#2E7D32', // Brand Primary specified
          700: '#1B5E20',
          800: '#144217',
          900: '#0B290E',
          950: '#051807',
        },
        harvest: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#FF9800', // Brand Accent specified
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        earth: {
          50: '#FDFBF7',
          100: '#F7F3EA',
          200: '#EAE1D0',
          300: '#D6C5A9',
          400: '#BFA47E',
          500: '#9C7A4E',
          600: '#785A32',
          700: '#5A4222',
          800: '#3D2B15',
          900: '#24190B',
        },
        slatebg: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-sm': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 4px -1px rgba(0, 0, 0, 0.03)',
        'soft-md': '0 8px 24px -4px rgba(46, 125, 50, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 16px 36px -6px rgba(46, 125, 50, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 24px 48px -12px rgba(46, 125, 50, 0.18)',
        'glow': '0 0 20px rgba(46, 125, 50, 0.35)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
