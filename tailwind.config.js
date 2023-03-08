/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '25%': '25%',
        'profile': '-6rem',
        '46px': '46px',
      },
      colors: {
        'greenCustom': '#0EDC8D',
      },
      padding: {
        '90px': '90px',
      },
      width: {
        '75px': '75px',
        '170px': '170px',
      },
      height: {
        '75px': '75px',
      },
      maxWidth: {
        '14rem': '14rem',
      },
      minWidth: {
        '150px': '150px',
      }
    },
  },
  plugins: [],
}
