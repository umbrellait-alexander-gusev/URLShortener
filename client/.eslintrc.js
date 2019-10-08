module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    jsx: true,
    ecmaFeatures: {
      jsx: true,
    },
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

    'plugin:react/recommended',
    'prettier/react',

    'plugin:jsx-a11y/recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['prettier', 'react', 'react-hooks', 'jsx-a11y'],
  settings: {
    'react': {
      version: 'detect',
    },
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        moduleDirectory: ['node_modules'],
      },
      webpack: {
        config: './webpack.config.js',
      },
    },
  },
  rules: {
    'import/no-default-export': 'error',
    'react/prop-types': 'off',
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
    'jsx-a11y/no-onchange': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  globals: {}
};
