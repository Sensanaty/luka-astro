/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			"borderColor": { "DEFAULT": "rgb(64 64 64 / 0.6)" },
		},
		screens: {
			"2xl": {"max": "1535px"},
			"xl": {"max": "1279px"},
			"lg": {"max": "1023px"},
			"md": {"max": "767px"},
			"sm": {"max": "639px"},
		},
		fontFamily: {
			mono: [
				"'Berkeley Mono Variable'",
				"ui-monospace",
				"SFMono-Regular",
				"Menlo",
				"Monaco",
				"Consolas",
				"'Liberation Mono'",
				"'Courier New'",
				"monospace"
			],
			sans: [
				"'Helvetica Now Display'",
				"ui-sans-serif",
				"system-ui",
				"-apple-system",
				"BlinkMacSystemFont",
				"Segoe UI",
				"Roboto",
				"'Helvetica Neue'",
				"Arial",
				"sans-serif"
			],
		},
	},
	plugins: [],
}
