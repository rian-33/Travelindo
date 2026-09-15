/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#C85C3E',
          'primary-hover': '#B04E36',
          'primary-light': '#F5EDE8',
          secondary: '#E8D5B7',
          'secondary-dark': '#D4C4A8',
          accent: '#4A6F4C',
          'accent-light': '#E8F0E9',
        },
        surface: {
          bg: 'var(--color-bg)',
          elevated: 'var(--color-bg-elevated)',
          muted: 'var(--color-bg-muted)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          inverse: 'var(--color-text-inverse)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          focus: 'var(--color-border-focus)',
        },
        focus: {
          ring: 'var(--color-focus-ring)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono: ['var(--font-mono)'],
      },
      fontSize: {
        'display-jumbo': ['clamp(3.5rem, 8vw, 6rem)', { lineHeight: '1.05', fontWeight: '700', fontFamily: 'var(--font-serif)' }],
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.1', fontWeight: '700', fontFamily: 'var(--font-serif)' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.15', fontWeight: '700', fontFamily: 'var(--font-serif)' }],
        'headline-1': ['clamp(1.75rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '700', fontFamily: 'var(--font-serif)' }],
        'headline-2': ['clamp(1.5rem, 2.5vw, 1.75rem)', { lineHeight: '1.25', fontWeight: '700', fontFamily: 'var(--font-serif)' }],
        'headline-3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'headline-4': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.35', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.7' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
        'caption': ['0.75rem', { lineHeight: '1.5' }],
        'overline': ['0.6875rem', { lineHeight: '1.5', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em' }],
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
      },
      borderRadius: {
        tight: 'var(--radius-tight)',
        card: 'var(--radius-card)',
        feature: 'var(--radius-feature)',
        'organic-tl': 'var(--radius-organic-tl)',
        'organic-br': 'var(--radius-organic-br)',
      },
      boxShadow: {
        paper: 'var(--shadow-paper)',
        card: 'var(--shadow-card)',
        float: 'var(--shadow-float)',
        'inner-glow': 'var(--shadow-inner-glow)',
      },
      transitionTimingFunction: {
        brand: 'var(--ease-brand)',
        spring: 'var(--ease-spring)',
      },
      transitionDuration: {
        fast: 'var(--duration-fast)',
        base: 'var(--duration-base)',
        slow: 'var(--duration-slow)',
        page: 'var(--duration-page)',
      },
      animation: {
        'fade-slide': 'fade-slide var(--duration-base) var(--ease-brand)',
        'fade-slide-up': 'fade-slide-up var(--duration-base) var(--ease-brand)',
        'scale-in': 'scale-in var(--duration-fast) var(--ease-brand)',
        'shimmer': 'shimmer 2s infinite',
        'stamp-bounce': 'stamp-bounce 0.6s var(--ease-spring)',
        'compass-rotate': 'compass-rotate 3s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-slide': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-slide-up': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'stamp-bounce': {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '30%': { transform: 'scale(1.15) rotate(-3deg)' },
          '50%': { transform: 'scale(0.95) rotate(2deg)' },
          '70%': { transform: 'scale(1.05) rotate(-1deg)' },
        },
        'compass-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'journal-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}