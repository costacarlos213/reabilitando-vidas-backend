/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    "@shared/(.*)$": "<rootDir>/shared/$1",
    "@entities/(.*)$": "<rootDir>/entities/$1",
    "@repositories/(.*)$": "<rootDir>/repositories/$1",
    "@useCases/(.*)$": "<rootDir>/useCases/$1",
    "@providers/(.*)$": "<rootDir>/providers/$1",
    "@database/(.*)$": "<rootDir>/database/$1",
    "@config/(.*)$": "<rootDir>/config/$1"
  },
  preset: 'ts-jest',
  rootDir: "src/",
  roots: [
    "<rootDir>"
  ],
  setupFiles: ['dotenv/config'],
  testEnvironment: "jest-environment-node",
};
