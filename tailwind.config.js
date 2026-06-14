/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pythonia: {
          dark: '#0f0e17',
          surface: '#1a1a2e',
          card: '#16213e',
          accent: '#7c3aed',
          gold: '#f59e0b',
          green: '#10b981',
          red: '#ef4444',
        }
      }
    },
  },
  plugins: [],
}
