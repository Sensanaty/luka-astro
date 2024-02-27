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
      },
      // Override breakpoints with max instead of min-width
      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
    },
  },
  plugins: [],
};
