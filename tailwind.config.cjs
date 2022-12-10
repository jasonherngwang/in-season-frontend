/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
