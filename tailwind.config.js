/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-fast': 'pulse 0.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 