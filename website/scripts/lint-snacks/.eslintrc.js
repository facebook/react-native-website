module.exports = {
  root: true,
  extends: '@react-native-community',
  "ignorePatterns": ["!**/tmp/**"],
  rules: {
    'prettier/prettier': [
      'error',
      {
        // Width of Snack player
        printWidth: 70,
      },
    ],
  },
};
