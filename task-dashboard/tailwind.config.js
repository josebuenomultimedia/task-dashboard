/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Habilita modo oscuro con la clase .dark
  theme: {
    extend: {
      colors: {
        // Usamos variables CSS para que cambien automáticamente con el tema
        background: 'var(--background)',
        card: 'var(--card)',
        border: 'var(--border)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        primary: '#4E60FF',
        secondary: '#6C7AE0',
        error: '#E74C3C',
        success: '#3BA55D',
      },
    },
  },
  plugins: [],
};
