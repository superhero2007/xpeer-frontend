module.exports = {
  root: true,

  env: {
    node: true
  },

  rules: {
    'space-before-function-paren': 'off',
    'no-prototype-builtins': 'off',
    curly: 'off',
    quotes: [
      2,
      'single',
      {
        allowTemplateLiterals: true
      }
    ],
    'no-unused-vars': 'warn',
    'prefer-const': 'warn',
    'no-extra-parens': 'warn',
    'no-self-assign': 'warn',
    'no-self-assign': 'warn',
    'no-dupe-keys': 'warn',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  },

  extends: ['plugin:vue/recommended', 'plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],

  parserOptions: {
    parser: 'babel-eslint'
  }
}
