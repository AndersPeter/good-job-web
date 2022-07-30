/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
],
  theme: {
    extend: {
      backgroundImage: {
        'bagde': "url('/Users/anderspetersorensen/git/good-job-web/good-job-web/src/assets/svg/badgeIcon.svg')",
        'person': "url('/Users/anderspetersorensen/git/good-job-web/good-job-web/src/assets/svg/personIcon.svg')"
      },
      colors: {
        gold: '#ffd700'

      }
    },
  },
  plugins: [],
}
