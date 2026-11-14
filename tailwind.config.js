/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        blush: '#fbcfe8',
        lavender: '#e9d5ff',
        cream: '#fef3c7',
        gold: '#d4af37',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
        body: ['"Poppins"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
