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
		maxWidth: {
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
		},
	},
	variants: {
		extend: {
			margin: ['first'],
		},
		transitionProperty: {
			height: 'height',
			spacing: 'margin, padding',
		},
		borderWidth: ['last', 'first'],
	},
	plugins: [require('@tailwindcss/forms')],
};
