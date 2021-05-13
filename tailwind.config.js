const { cyan, blue, white, coolGray } = require('tailwindcss/colors');
module.exports = {
	purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	darkMode: false, // or 'media' or 'class'
	important: true,
	theme: {
		extend: {},
		colors: {
			cyan,
			blue,
			white,
			gray: coolGray,
		},
	},
	variants: {
		extend: {
			margin: ['first'],
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
