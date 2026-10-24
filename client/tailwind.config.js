/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          50: '#FAF9F6', // Warm parchment off-white
          100: '#F4F2EC',
          200: '#ECE8DF',
          300: '#DFDAD0',
          400: '#C7C1B5',
        },
        charcoal: {
          950: '#0F1215',
          900: '#16191D',
          850: '#1D2126',
          800: '#24292F',
          700: '#343B43',
          600: '#4B535D',
          500: '#656F7D',
          400: '#8C97A5',
          300: '#B4BDC8',
        },
        emeraldAccent: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          chartreuse: '#99E62A',
        },
        evidence: {
          verified: '#059669',
          unverified: '#D97706',
          gap: '#DC2626',
          strength: '#2563EB',
        }
      },
      fontFamily: {
        display: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'elevated': '0 4px 12px 0 rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        'focus-ring': '0 0 0 3px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
