/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0D267D",
        secondary: "",
        background: "#A6B9FF1E",
        whitish: "#F6F6F6",
        light: "#0D267D30",
        faded: "#00000082",
        gray: "#667085",
        grayDark: "#475467",
        purp: "#4961EA",
        grey: "#DADADABF",
        disabled: "#DDE1ED",
      },
      animation: {
        wiggle: "wiggle 300ms ease-in forwards 0.4s",
        dropdown: "dropdown 250ms ease-in forwards",
        slideIn: "slideIn 400ms ease-in forwards",
        shake: "shakeKeyframe 100ms ease-in forwards",
        slideOut: "slideOut 300ms ease-out forwards",
        slideDown: "slideDown 200ms ease-in forwards",
        slideUp: "slideUp 200ms ease-in forwards",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        dropdown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(5px)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(40px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
        slideOut: {
          "0%": { opacity: 1, transform: "translateX(0px)" },
          "50%": { "z-index": "100" },
          "90%": { "z-index": "100" },
          "100%": {
            opacity: 0,
            transform: "translateX(40px)",
            "z-index": "-310",
          },
        },
        slideDown: {
          "0%": {
            opacity: 0,
            transform: "translateY(-40px)",
            "z-index": "10",
          },
          "100%": { opacity: 1, transform: "translateY(0px)", "z-index": "10" },
        },
        slideUp: {
          "0%": { opacity: 1, transform: "translateY(0px)", "z-index": "10" },
          "100%": {
            opacity: 0,
            transform: "translateY(-30px)",
            "z-index": "-10",
          },
        },
        shakeKeyframe: {
          "0%": { transform: "translateX(0px)" },
          "25%": { transform: "translateX(10px)" },
          "50%": { transform: "translateX(0px)" },
          "75%": { transform: "translateX(-10px)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
    },
  },
  plugins: [],
};
