/** @type {import('jest').Config} */
const config = {
	verbose: true,
	testEnvironment: 'node',
	testMatch: ['./**/*/*.test.js'],
	transform: {
		'^.+\\.js$': 'babel-jest',
	},
};

module.exports = config;
