/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-fast': 'pulse 0.5s ease-in-out infinite',
        'blink': 'blink 2s ease-in-out infinite',
        'shake': 'shake 1s ease-in-out infinite',
      },
      keyframes: {
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%': { transform: 'translateX(-2px)' },
          '30%': { transform: 'translateX(2px)' },
          '50%': { transform: 'translateX(-2px)' },
          '70%': { transform: 'translateX(2px)' },
          '90%': { transform: 'translateX(-2px)' },
        },
      },
    },
  },
  plugins: [],
} 