/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Institutional deep-green ink scale — used throughout as text/surface tones.
        sage: {
          50: '#eef2ee',
          100: '#d9e3da',
          200: '#b3c7b6',
          300: '#87a58c',
          400: '#5f8267',
          500: '#3f6249',
          600: '#2f4d38',
          700: '#25402d',
          800: '#1c3223',
          900: '#0f1f14',
        },
        maroon: {
          50: '#f6ecec',
          100: '#e8cfd1',
          400: '#8a2f3a',
          500: '#7a2331',
          600: '#5c1a25',
          700: '#441420',
        },
        gold: {
          300: '#e2c774',
          400: '#c9a227',
          500: '#b08d3f',
          600: '#8f6f2e',
        },
        cream: '#f8f3e7',
        sand: '#efe4c9',
      },
      boxShadow: {
        soft: '0 4px 20px rgba(15, 31, 20, 0.08)',
        book: '0 20px 45px rgba(15, 31, 20, 0.22)',
        gilded: '0 0 0 1px rgba(201, 162, 39, 0.4), 0 18px 34px rgba(15, 31, 20, 0.28)',
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
        fadeIn: 'fadeIn 0.9s ease-out both',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
