const { defaults } = require('jest-config')

module.exports = {
  clearMocks: true,
  testPathIgnorePatterns: [
    ...defaults.testPathIgnorePatterns
  ],
  testEnvironment: 'node',
  collectCoverageFrom: [
    'src/**/*.js'
  ]
}
