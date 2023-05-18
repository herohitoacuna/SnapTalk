/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"auth-pattern": "url('./assets/auth-bg.jpg')",
			},
		},
	},
	plugins: [],
};
