/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14181A',
        canvas: '#FAF9F5',
        brand: {
          DEFAULT: '#0E6B5C',
          dark: '#0A4F44',
          tint: '#E4F1EE',
        },
        coral: {
          DEFAULT: '#E8543F',
          dark: '#C43F2D',
          tint: '#FCE6E2',
        },
        amber: {
          DEFAULT: '#E8A23D',
          dark: '#C9822A',
          tint: '#FBEDD9',
        },
        indigo: {
          DEFAULT: '#2A3E9E',
          dark: '#1F2E7A',
          tint: '#E1E4F7',
        },
        stone: '#6B6F6A',
        line: '#E3E1D9',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.15em',
        mega: '0.25em',
      },
      keyframes: {
        brushReveal: {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        hueDrift: {
          '0%, 100%': { backgroundColor: '#0E6B5C' },
          '33%': { backgroundColor: '#2A3E9E' },
          '66%': { backgroundColor: '#E8543F' },
        },
        countUp: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
      animation: {
        brushReveal: 'brushReveal 1.1s cubic-bezier(0.65, 0, 0.35, 1) forwards',
        fadeUp: 'fadeUp 0.7s ease-out forwards',
        hueDrift: 'hueDrift 8s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      borderRadius: {
        sm: '2px',
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
}