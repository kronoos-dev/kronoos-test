module.exports = {
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['lcov', 'text-summary'],
};