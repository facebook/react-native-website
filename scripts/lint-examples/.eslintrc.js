module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Many existing inline styles in examples
    'react-native/no-inline-styles': 'off',
  },
};
