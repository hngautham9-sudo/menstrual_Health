/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50:  '#FDF2F5',
          100: '#FDE8EF',
          200: '#F9C6D4',
          300: '#F5A3B8',
          400: '#E87B99',
          500: '#D4537E',   // primary CTA
          600: '#B8365F',
          700: '#931943',
          800: '#6E0D2C',
          900: '#4A0519',
        },
        blush:  '#F5C6D0',
        mauve:  '#C9748F',
        sage:   '#A8D5B5',
        cream:  '#FDF6F8',
        muted:  '#8B7B82',
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(147, 25, 67, 0.04)',
        glow: '0 0 20px rgba(212, 83, 126, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(8px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.95' },
        }
      }
    },
  },
  plugins: [],
}
