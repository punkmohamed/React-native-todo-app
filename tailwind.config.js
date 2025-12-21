/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}","./constants/**/*.{js,jsx,ts,tsx}","./utils/**/*.{js,jsx,ts,tsx}"],
  // Keep dynamically-generated tailwind classes from being purged.
  // Use regex patterns so newly-added palette colors are preserved without listing each class.
  safelist: [
    { pattern: /bg-(blue|purple|red|green|yellow|indigo|rose|amber|emerald|sky|fuchsia)-(50|500|600|700)/ },
    { pattern: /text-(white|gray-700|blue-700|purple-700|red-700|green-700|yellow-700|indigo-700|rose-700|amber-700|emerald-700|sky-700|fuchsia-700)/ },
    'bg-white/20','bg-gray-100','bg-gray-200','border-transparent','bg-gray-900','bg-red-50','bg-indigo-50','bg-indigo-600'
  ],  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4F46E5', // indigo-600
          light: '#EEF2FF',   // indigo-50
          dark: '#3730A3',    // indigo-700
        },
      },
    },
  },
  plugins: [],
}