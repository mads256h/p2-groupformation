module.exports = {
  env: {
    browser: false,
    node: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:jsdoc/recommended'
  ],
  plugins: [
    "jsdoc"
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "eqeqeq": ["error", "always"],
    "no-eval": ["error"],
    "no-implied-eval": ["error"],
    "no-implicit-coercion": ["error"],
    "no-labels": ["error"],
    "no-magic-numbers": ["error"],
    "strict": ["error"],
    "yoda": ["error", "never"],
    "no-shadow": ["error"],
    "brace-style": ["error", "stroustrup"],
    "camelcase": ["error", {"properties": "always"}],
    "func-call-spacing": ["error", "never"],
    "func-style": ["error", "declaration", {"allowArrowFunctions": true}],
    "indent": ["error"],
    "key-spacing": ["error"],
    "new-parens": ["error"],
    "no-lonely-if": ["error"],
    "no-tabs": ["error"],
    "no-trailing-spaces": ["error"],
    "no-unneeded-ternary": ["error"],
    "curly": ["error"],
    "wrap-iife": ["error"],
    "new-cap": ["error"],
    "no-var": ["error"]
  }
}
