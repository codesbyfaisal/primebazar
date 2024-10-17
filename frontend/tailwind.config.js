/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#af9f8f',
        secondary: '#4b383f',
      },
      screens: {
        xxs: '350px',
        xs: '420px',
      },
    },
  },
  plugins: [],
}