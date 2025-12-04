/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#111827',
        accent: '#AF4261',
        bannerStart: '#f3ec78',
        bannerEnd: '#af4261'
      },
      borderRadius: {
        'xl2': '1rem'
      }
    },
  },
  plugins: [],
}

