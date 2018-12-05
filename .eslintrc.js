module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    "no-console": "off",
    "vue/max-attributes-per-line": "off",
    "vue/require-default-prop": "off",
    "prettier/prettier": ["error", {
      "semi": false,
      "bracketSpacing": true,
      "singleQuote": true
    }],
  }
}
