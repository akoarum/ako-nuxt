module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.common.js'
  },
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest'
  },
  collectCoverageFrom: [
    'src/*.{js,vue}'
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
    '/_hygen'
  ]
}
