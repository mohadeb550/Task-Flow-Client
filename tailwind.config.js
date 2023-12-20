/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      play: ['Play', 'sans-serif'],
      titan: ['Titan One', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      racing: ['Racing Sans One', 'sans-serif'],
      prompt: ['Prompt', 'sans-serif'],
    },
    extend: {
      darkMode: 'class',
    },
  },
  plugins: [require("daisyui")],
}
