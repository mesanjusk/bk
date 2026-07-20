/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', '"Libre Baskerville"', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', '"Lato"', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Institutional deep-green scale, anchored on the brand primary #1F3D2B (sage-800).
        sage: {
          50: '#eef3ef',
          100: '#d7e4da',
          200: '#b0c9b6',
          300: '#84a68f',
          400: '#5c8267',
          500: '#3c6248',
          600: '#2c4e37',
          700: '#24402d',
          800: '#1f3d2b',
          900: '#132318',
        },
        maroon: {
          50: '#f6ecec',
          100: '#e8cfd1',
          400: '#8a2f3a',
          500: '#7a2331',
          600: '#5c1a25',
          700: '#441420',
        },
        // Muted metallic gold accent, anchored on #C2A878.
        gold: {
          300: '#d9c49a',
          400: '#c2a878',
          500: '#a88f5f',
          600: '#8a744a',
        },
        ink: '#111111',
        muted: '#666666',
        canvas: '#f7f5f2',
        // Legacy aliases kept so existing pages retint automatically to the
        // new editorial palette without touching every className.
        cream: '#f7f5f2',
        sand: '#f1eee7',
      },
      fontSize: {
        'display-sm': ['3rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        display: ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['6rem', { lineHeight: '0.98', letterSpacing: '-0.025em' }],
        'display-xl': ['6.875rem', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0, 0, 0, 0.08)',
        book: '0 20px 45px rgba(0, 0, 0, 0.18)',
        gilded: '0 0 0 1px rgba(194, 168, 120, 0.4), 0 18px 34px rgba(0, 0, 0, 0.22)',
        lift: '0 24px 48px -12px rgba(17, 17, 17, 0.16)',
        card: '0 2px 24px rgba(17, 17, 17, 0.06)',
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
