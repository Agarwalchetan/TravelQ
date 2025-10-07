/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Light Mode - Enhanced Travel Theme
        primary: '#7C3AED', // Vibrant purple
        secondary: '#9333EA', // Rich purple
        accent: '#6366F1', // Bright indigo
        background: '#FAFBFC', // Ultra light gray with blue tint
        surface: '#F1F5F9', // Light surface
        'text-primary': '#1E293B', // Dark blue-gray
        'text-secondary': '#475569', // Medium blue-gray
        border: '#E2E8F0', // Light border
        success: '#10B981', // Emerald
        
        // Dark Mode - Enhanced Space Theme
        'dark-background': '#0F172A', // Deep space blue
        'dark-surface': '#1E293B', // Rich space blue
        'dark-primary': '#A78BFA', // Soft glowing purple
        'dark-accent': '#93C5FD', // Cosmic blue
        'dark-text-primary': '#F8FAFC', // Starlight white
        'dark-text-secondary': '#94A3B8', // Nebula gray
        'dark-border': '#334155', // Space dust
        'dark-success': '#34D399', // Aurora green

        // Enhanced Color Palette for Better Contrast
        teal: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        coral: {
          50: '#FEF7F0',
          100: '#FEECDC',
          200: '#FED7B9',
          300: '#FDBA8C',
          400: '#FF8A4C',
          500: '#FF6B35',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
        },
        sand: {
          50: '#FEFDF8',
          100: '#FEF9E7',
          200: '#FEF3C7',
          300: '#FDE68A',
          400: '#FCD34D',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Better contrast colors for accessibility
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Raleway', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
        'cosmic-spin': 'cosmicSpin 20s linear infinite',
        'meteor': 'meteor 5s linear infinite',
        'aurora': 'aurora 10s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.95)' },
        },
        cosmicSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        meteor: {
          '0%': { transform: 'translateX(0) translateY(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': { transform: 'translateX(-500px) translateY(500px)', opacity: '0' },
        },
        aurora: {
          '0%, 100%': { transform: 'scaleY(1) translateY(0)' },
          '50%': { transform: 'scaleY(1.1) translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(124, 58, 237, 0.6)' },
        },
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(to bottom, #0F172A, #1E293B)',
        'space-light': 'linear-gradient(135deg, #FAFBFC, #F1F5F9)',
        'cosmic-grid': 'radial-gradient(circle, rgba(124, 58, 237, 0.1) 1px, transparent 1px)',
        'aurora-glow': 'linear-gradient(135deg, rgba(147, 197, 253, 0.2), rgba(183, 148, 244, 0.2))',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(124, 58, 237, 0.3)',
        'glow-lg': '0 0 40px rgba(124, 58, 237, 0.4)',
        'cosmic': '0 0 30px rgba(147, 197, 253, 0.3)',
        'cosmic-lg': '0 0 50px rgba(147, 197, 253, 0.4)',
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      backdropBlur: {
        xs: '2px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}