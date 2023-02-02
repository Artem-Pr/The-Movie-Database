module.exports = {
    // Automatically clear mock calls and instances between every tests
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: false,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.json',
        '!src/**/index.{ts,tsx}',
        '!src/**/constants.{ts,tsx}',
        '!src/**/dist/**/*.*',
        '!src/**/*.d.{ts,tsx}',
    ],

    // The directory where Jest should output its coverage files
    coverageDirectory: 'coverage',

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [
        "text-summary",
        "lcov",
    ],

    // An array of file extensions your modules use
    moduleFileExtensions: ['js', 'ts', 'jsx', 'json', 'tsx'],

    modulePaths: [
        "<rootDir>"
    ],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
        "^@assets(.*)$": "<rootDir>/src/assets$1",
        "^@src(.*)$": "<rootDir>/src$1",
        "^@pages(.*)$": "<rootDir>/src/app/pages$1",
        "^@api(.*)$": "<rootDir>/src/api$1",
    },

    // A preset that is used as a base for Jest's configuration
    preset: 'ts-jest',

    // The test environment that will be used for testing
    testEnvironment: 'jsdom',

    // Options that will be passed to the testEnvironment
    testEnvironmentOptions: {
        url: 'http://localhost'
    },

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    testPathIgnorePatterns: ['\\\\node_modules\\\\'],

    // The regexp pattern Jest uses to detect test files
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts|tsx|js|jsx)$',

    // A map from regular expressions to paths to transformers
    transform: {
        "^.+\\.(ts|tsx)?$": "ts-jest",
        '^.+\\.(js|jsx)$': 'babel-jest',
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
    },

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: ['<rootDir>/node_modules/'],

    // Indicates whether each individual test should be reported during the run
    verbose: true,
};
