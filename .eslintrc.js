module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['prettier', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',

    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 0,
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 0,
  },
}
