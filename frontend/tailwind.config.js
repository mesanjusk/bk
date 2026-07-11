/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        sage: {
          50: '#f4f7f4',
          100: '#e6ede6',
          200: '#cddccd',
          300: '#a9c2a9',
          400: '#7fa17f',
          500: '#5f8560',
          600: '#4a6b4b',
          700: '#3d573e',
          800: '#334634',
          900: '#2b3a2c',
        },
        cream: '#faf8f3',
        sand: '#f0ebe1',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out both',
      },
    },
  },
  plugins: [],
};
