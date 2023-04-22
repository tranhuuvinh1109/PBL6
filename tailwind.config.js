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
        '120px': '120px',
        '170px': '170px',
        '230px': '230px',
        '380px': '380px',
      },
      height: {
        '75px': '75px',
        '70px': '70px',
      },
      maxWidth: {
        '14rem': '14rem',
      },
      minWidth: {
        '150px': '150px',
      },
      minHeight: {
        '150px': '150px',
        '630px': '630px',
        '480px': '480px',
      },
      maxHeight: {
        '490px': '490px',
      },
      zIndex: {
        '100000': '100000',
      }
    },
  },
  plugins: [],
}
