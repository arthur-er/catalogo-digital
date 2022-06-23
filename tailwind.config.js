/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./resources/**/*.{edge,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
