/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0ea5e9',
        navbg: {
          light: '#f8fafc',
          dark: '#0f172a'
        },
        white: {
          DEFAULT: '#ffffff',
          dark: '#0f172a'
        }
      },
      fontFamily: {
        playball: ['"Playball"', 'cursive']
      }
    },
  },
  plugins: [],
}