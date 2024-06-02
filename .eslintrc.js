const { join } = require('path');

module.exports = {
  root: true,
  extends: ['@arcblock/eslint-config-ts', 'plugin:prettier/recommended'],
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'react/require-default-props': 'off',
    'react/self-closing-comp': 'off',
    'prettier/prettier': 'error',
  },
};
