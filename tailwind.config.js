/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    screens: { sm: '640px', nav: '900px', lg: '1024px' },
    extend: {
      colors: {
        wine: { DEFAULT: '#6B1E2A', dark: '#4A1420' },
        tealtext: { DEFAULT: '#1F7F87', dark: '#1A6F76' },
        teal: { DEFAULT: '#32AEB8', badge: '#34B0B9' },
        mist: '#EAF5F6',
        blush: { DEFAULT: '#F6EBEE', pink: '#F6D7DE' },
        ink: '#2B2326',
        body: '#4F4347',
        muted: '#5E5257',
        line: '#EFE3E6',
        field: '#8C7A80',
        error: '#B3261E',
      },
      fontFamily: {
        sans: ['Mulish', 'system-ui', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        hero: '0 18px 40px rgba(43,35,38,0.2)',
        polaroid: '0 14px 30px rgba(43,35,38,0.18)',
        pill: '0 8px 20px rgba(43,35,38,0.2)',
      },
    },
  },
  plugins: [],
}
