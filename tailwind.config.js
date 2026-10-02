/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tribu: {
          crema: '#f6ebd4',
          verdeOscuro: '#012e29',
          naranja: '#a54d17',
          verdePino: '#1b4f4b',
        }
      },
      fontFamily: {
        titulos: ['"News706 BT"', 'serif'],
        cuerpo: ['"Tw Cen MT"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}