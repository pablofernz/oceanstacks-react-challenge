const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {},
		screens: {
			xs: '480px',
			...require('tailwindcss/defaultTheme').screens,
			900: '900px',
			...require('tailwindcss/defaultTheme').screens,
		},
	},
};

export default config;
