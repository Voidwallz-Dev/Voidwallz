/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'void-red': '#B03030',
        'void-cream': '#F6EFD2',
        'void-khaki': '#E2DDB4',
        'void-black': '#000000',
        'void-surface': '#111111',
        'void-border': '#222222',
        'void-dark': '#0a0a0a',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}