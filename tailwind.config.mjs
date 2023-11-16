/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}'],
	darkMode: ['class', '.light'],
	theme: {
		extend: {
			textDecorationThickness: {
				3: '3px'
			},
			colors: {
				'bg': 'var(--bg)',
				'highlight': 'var(--highlight)',
				'cl': 'var(--cl)',
				'accent': 'var(--accent)',
				'ruby': 'var(--ruby)',
			}
		},
	},
	plugins: [],
}
