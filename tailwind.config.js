/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const {nextui} = require("@nextui-org/theme");


export default {
  content: [
    "./index.html",
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        ...colors,
        'white': '#ecf0f1',
        'secondary': '#fff',
      }
    },
  },
  plugins: [nextui()],
}

