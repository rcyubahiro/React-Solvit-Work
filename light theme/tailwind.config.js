/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector', // Changed from 'class' to 'selector'
  theme:  {
    extend: {
      colors: {
        primary: {
          50: '#e9effd',
          100: '#bbcff9',
          200: '#9bb7f6',
          300: '#6d96f2',
          400: '#5182ef',
          500: '#2563eb',
          600: '#225ad6',
          700: '#1a46a7',
          800: '#143681',
          900: '#102a63',
          DEFAULT: '#2563eb',
        },
      },
    },
  },
  plugins: [],
}