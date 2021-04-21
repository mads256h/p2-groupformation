module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
        "jest/globals": true
    },
    extends: [
        "eslint:recommended",
        "plugin:jsdoc/recommended",
        "plugin:jest/recommended"
    ],
    plugins: [
        "jsdoc",
        "jest"
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    rules: {
        "brace-style": ["error", "stroustrup"],
        "camelcase": ["error", { "properties": "always" }],
        "curly": ["error"],
        "comma-style": ["error", "last"],
        "default-param-last": ["error"],
        "eqeqeq": ["error", "always"],
        "func-call-spacing": ["error", "never"],
        "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
        "indent": ["error"],
        "key-spacing": ["error"],
        "keyword-spacing": ["error", { "before": true, "after": true }],
        "new-cap": ["error"],
        "new-parens": ["error"],
        "no-eval": ["error"],
        "no-implicit-coercion": ["error"],
        "no-implied-eval": ["error"],
        "no-labels": ["error"],
        "no-lonely-if": ["error"],
        "no-param-reassign": ["error"],
        "no-shadow": ["error"],
        "no-tabs": ["error"],
        "no-trailing-spaces": ["error"],
        "no-unneeded-ternary": ["error"],
        "no-var": ["error"],
        "no-whitespace-before-property": ["error"],
        "padded-blocks": ["error", "never"],
        "prefer-rest-params": ["error"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "space-infix-ops": ["error"],
        "space-unary-ops": ["error"],
        "spaced-comment": ["error", "always"],
        "strict": ["error"],
        "switch-colon-spacing": ["error"],
        "wrap-iife": ["error"],
        "yoda": ["error", "never"],
    }
};
