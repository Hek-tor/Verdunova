module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{ttf,webp,svg,png,css,html,js,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};