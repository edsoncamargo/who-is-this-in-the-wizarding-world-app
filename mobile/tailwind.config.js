/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9CB0DC",
        secondary: "#222455",
        tertiary: "#0F1020",
        cta: "#2D6EFC",
        highlight: "#E7DB80",
        error: "#A20808",
        success: "#276101",
        "neutral-1": "#F0F7F4",
        "neutral-2": "#A6A7A7",
      },
      fontFamily: {
        thin: "Roboto_100Thin",
        "thin-italic": "Roboto_100Thin_Italic",
        light: "Roboto_300Light",
        "light-italic": "Roboto_300Light_Italic",
        regular: "Roboto_400Regular",
        "regular-italic": "Roboto_400Regular_Italic",
        medium: "Roboto_500Medium",
        "medium-italic": "Roboto_500Medium_Italic",
        bold: "Roboto_700Bold",
        "bold-italic": "Roboto_700Bold_Italic",
        black: "Roboto_900Black",
        "black-italic": "Roboto_900Black_Italic",
        handwriting: "Satisfy_400Regular",
      },
    },
  },
  plugins: [],
};
