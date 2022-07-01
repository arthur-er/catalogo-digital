/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#cde5fe',
          200: '#9bcafc',
          300: '#68b0fb',
          400: '#3695f9',
          500: '#047bf8',
          600: '#0362c6',
          700: '#024a95',
          800: '#023163',
          900: '#011932',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
