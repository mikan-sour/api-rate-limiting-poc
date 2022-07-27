/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  coverageDirectory: "coverage",

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: [
  //   "json",
  //   "text",
    "lcov",
  //   "clover"
  ],
  errorOnDeprecated: false,
  globals: {},
  moduleDirectories: [
    "node_modules"
  ],
  moduleFileExtensions: [
    "js",
    "ts",
  ],
  preset: "ts-jest",
  transform: {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!variables/.*)"
  ],

  restoreMocks: true,
  roots: [
    "<rootDir>/src"
  ],
  runner: "jest-runner",
  slowTestThreshold: 7.5,
  testEnvironment: "node",
  // testEnvironmentOptions: {},
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
  ],

  verbose: true,

};
