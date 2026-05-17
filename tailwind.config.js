/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1d4ed8',
          700: '#1e40af',
          800: '#1e3a8a',
          900: '#0f2557',
        },
        accent: {
          DEFAULT: '#0ea5e9',
          light: '#38bdf8',
          dark: '#0284c7',
        },
        medical: {
          red: '#ef4444',
          green: '#10b981',
          teal: '#14b8a6',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15, 37, 87, 0.08)',
        'card-hover': '0 16px 48px -8px rgba(15, 37, 87, 0.16)',
        premium: '0 8px 40px -8px rgba(29, 78, 216, 0.2)',
        glow: '0 0 30px rgba(14, 165, 233, 0.15)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0f2557 0%, #1d4ed8 50%, #0ea5e9 100%)',
        'gradient-soft': 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
        'gradient-card': 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        'hero-overlay': 'linear-gradient(135deg, rgba(15,37,87,0.85) 0%, rgba(29,78,216,0.6) 60%, rgba(14,165,233,0.3) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
