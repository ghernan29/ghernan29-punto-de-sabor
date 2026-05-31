import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff5ee',
          100: '#ffe6d3',
          200: '#ffc7a3',
          300: '#ffa168',
          400: '#ff7a3c',
          500: '#f25a18',
          600: '#d9430c',
          700: '#b4330c',
          800: '#902b11',
          900: '#742612',
        },
        accent: {
          500: '#1f8a3c',
          600: '#196f30',
        },
        ink: {
          900: '#1a120b',
          700: '#3b2a1f',
          500: '#6b5b50',
        },
        cream: '#fff8f1',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 6px 24px -8px rgba(60, 30, 10, 0.18)',
      },
    },
  },
  plugins: [],
};

export default config;
