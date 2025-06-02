/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'laptop': { 'raw': '(min-width: 1024px)' },
        'tablet': { 'raw': '(min-width: 768px) and (max-width: 1023px)' },
        'mobile': { 'raw': '(max-width: 767px)' }
      }
    },
  },
  plugins: [],
}