/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}"],
  darkMode: ["class", ".light"],
  theme: {
    extend: {
      textDecorationThickness: {
        3: "3px",
      },
      colors: {
        bg: "var(--bg)",
        highlight: "var(--highlight)",
        cl: "var(--cl)",
        accent: "var(--accent)",
        ruby: "var(--ruby)",
        orange: "var(--orange)",
        go: "var(--go)",
        rust: "var(--rust)",
      },
      // Override breakpoints with max instead of min-width
      screens: {
        sm: { max: "639px" },
        md: { max: "767px" },
        lg: { max: "1023px" },
        xl: { max: "1279px" },
        "2xl": { max: "1535px" },
      },
    },
  },
  plugins: [],
};
