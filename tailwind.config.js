/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // red-700
        background: "var(--color-background)", // white
        foreground: "var(--color-foreground)", // gray-900
        primary: {
          DEFAULT: "var(--color-primary)", // red-700
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // dark-red
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-600
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-50
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // coral-red
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-900
        },
        card: {
          DEFAULT: "var(--color-card)", // gray-50
          foreground: "var(--color-card-foreground)", // gray-900
        },
        success: {
          DEFAULT: "var(--color-success)", // green-600
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // yellow-500
          foreground: "var(--color-warning-foreground)", // gray-900
        },
        error: {
          DEFAULT: "var(--color-error)", // red-600
          foreground: "var(--color-error-foreground)", // white
        },
        // Educational Theme Colors
        institutional: {
          DEFAULT: "var(--color-institutional)", // red-700
          foreground: "var(--color-institutional-foreground)", // white
        },
        trust: {
          DEFAULT: "var(--color-trust)", // slate-700
          foreground: "var(--color-trust-foreground)", // white
        },
        canvas: {
          DEFAULT: "var(--color-canvas)", // gray-25
          foreground: "var(--color-canvas-foreground)", // gray-900
        },
        // Text Colors
        'text-primary': "var(--color-text-primary)", // gray-900
        'text-secondary': "var(--color-text-secondary)", // gray-500
        'text-tertiary': "var(--color-text-tertiary)", // gray-600
        // Interactive Colors
        hover: "var(--color-hover)", // red-700 with opacity
        active: "var(--color-active)", // red-700 with opacity
      },
      borderRadius: {
        lg: "var(--radius-lg)", // 0.75rem
        md: "var(--radius-md)", // 0.5rem
        sm: "var(--radius-sm)", // 0.25rem
        xl: "var(--radius-xl)", // 1rem
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'], // scholarly-authority
        body: ['Inter', 'sans-serif'], // exceptional-readability
        cta: ['Inter', 'sans-serif'], // clear-action-clarity
        accent: ['Playfair Display', 'serif'], // elegant-treatment
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'xs': 'var(--spacing-xs)', // 0.25rem
        'sm': 'var(--spacing-sm)', // 0.5rem
        'md': 'var(--spacing-md)', // 1rem
        'lg': 'var(--spacing-lg)', // 1.5rem
        'xl': 'var(--spacing-xl)', // 2rem
        '2xl': 'var(--spacing-2xl)', // 3rem
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'institutional': 'var(--shadow-institutional)', // educational-depth
        'interactive': 'var(--shadow-interactive)', // hover-elevation
      },
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '400ms',
      },
      transitionTimingFunction: {
        'educational': 'cubic-bezier(0.4, 0.0, 0.2, 1)', // thoughtful-transitions
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.4, 0.0, 0.2, 1)',
        'pulse-subtle': 'pulseSubtle 4s cubic-bezier(0.4, 0.0, 0.2, 1) infinite',
        'logo-entrance': 'logoEntrance 1.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        logoEntrance: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '60%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      aspectRatio: {
        'campus': '16/9', // campus-photography
        'portrait': '3/4', // student-photos
        'square': '1/1', // social-media
      },
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))',
        'campus-grid': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      maxWidth: {
        'prose': '65ch',
        'content': '1200px',
        'wide': '1400px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}