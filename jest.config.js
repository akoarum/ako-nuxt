module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig-test.json'
    }
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'ts', 'vue', 'json', 'tsx'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/tests/**/*.spec.ts', '<rootDir>/tests/**/*.spec.js'],
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}'
  ],
  coverageReporters: [
    'html',
    'text-summary'
  ],
  coverageDirectory: '<rootDir>/__test__/coverage',
  coveragePathIgnorePatterns: [
    '/node_modules',
    '/dist',
    '.eslintrc.js',
    '/_hygen',
    '/src/types',
    '/.nuxt'
  ]
}
