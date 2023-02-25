/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '25%': '25%',
      },
      colors: {
        'greenCustom': '#0EDC8D',
      },
      padding: {
        '90px': '90px',
      },
      width: {
        '75px': '75px',
      },
      height: {
        '75px': '75px',
      }
    },
  },
  plugins: [],
}
