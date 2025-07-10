/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#1E1E2F',
        card: '#2A2A40',
        border: '#3B3B55',
        primary: '#4E60FF',
        secondary: '#6C7AE0',
        success: '#3BA55D',
        error: '#E74C3C',
        warning: '#F39C12',
        text: '#F4F4F7',
        muted: '#B0B3C7',
      },
    },
  },
  plugins: [],
};
