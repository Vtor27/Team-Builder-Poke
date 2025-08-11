/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        slate: require("tailwindcss/colors").slate,
        lemonChiffon: "#E0CEBE",
        cian: "#DBEAFE"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "6rem",
      }
    },
  },
  plugins: [],
};
