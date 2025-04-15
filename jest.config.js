/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
    testEnvironment: 'node',
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
        '^.+\\.module\\.(css|scss)$': 'jest-css-modules-transform',
    },
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'babel-jest',
    },
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/entities/**/*', '!src/redux/store.ts'],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
    globals: {
        'ts-jest': {
            diagnostics: false,
        },
    },
};
