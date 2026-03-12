/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F8F6F3',
        charcoal: '#2A2624',
        taupe: '#6B5D56',
        rose: '#D4A5A5',
        beige: '#E8DCC8',
      },
      fontFamily: {
        clash: ['Clash Display', 'Playfair Display', 'serif'],
        satoshi: ['Satoshi', 'Inter', 'sans-serif'],
      },
      animation: {
        'drift': 'drift 20s infinite alternate linear',
        'fade-in': 'fadeIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(30px, 30px) rotate(5deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
