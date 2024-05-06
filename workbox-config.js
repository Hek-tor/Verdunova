module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{webp,svg,png,css,html,js,md}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};