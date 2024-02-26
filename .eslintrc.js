/** @type {import('eslint').Linter.Config} **/
module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
  },
  ignorePatterns: ['node_modules', 'dist', 'build', 'types'],
}
