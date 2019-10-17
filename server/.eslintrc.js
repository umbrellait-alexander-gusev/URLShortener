module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',

    'plugin:prettier/recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['prettier'],
  settings: {
    'import/extensions': ['.js'],
    'import/resolver': {
      node: {
        extensions: ['.js'],
        moduleDirectory: ['node_modules'],
      }
    },
  },
  rules: {
    'import/no-default-export': 'error',
    'prettier/prettier': 'error',
    'no-console': 'warn',
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreComments: true,
        ignoreUrls: true,
        ignoreTrailingComments: true,
        ignorePattern: '(^\\s*(const|let|var)\\s.+=\\s*require\\s*\\(|^import\\s.+\\sfrom\\s.+;$)',
      },
    ],
  },
  globals: {},
};
