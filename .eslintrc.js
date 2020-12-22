module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],

  parserOptions: {
    ecmaVersion: 2020,
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/attributes-order': 'warn',
    'vue/block-tag-newline': 'warn',
    'vue/component-definition-name-casing': 'warn',
    'vue/component-name-in-template-casing': 'warn',
    'vue/component-tags-order': 'warn',
    'vue/custom-event-name-casing': 'warn',
    'vue/html-closing-bracket-newline': 'warn',
    'vue/html-closing-bracket-spacing': 'warn',
    'vue/html-indent': 'warn',
    'vue/html-quotes': 'warn',
    'vue/max-attributes-per-line': 'warn',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/name-property-casing': 'warn',
    'vue/no-arrow-functions-in-watch': 'warn',
    'vue/no-async-in-computed-properties': 'warn',
    'vue/no-boolean-default': 'warn',
    'vue/no-confusing-v-for-v-if': 'warn',
    'vue/no-deprecated-scope-attribute': 'warn',
    'vue/no-deprecated-slot-attribute': 'warn',
    'vue/no-deprecated-slot-scope-attribute': 'warn',
    'vue/no-dupe-keys': 'warn',
    'vue/no-dupe-v-else-if': 'warn',
    'vue/no-duplicate-attributes': 'warn',
    'vue/no-irregular-whitespace': 'warn',
    'vue/no-lone-template': 'warn',
    'vue/no-multi-spaces': 'warn',
    'vue/no-multiple-objects-in-class': 'warn',
    'vue/no-multiple-slot-args': 'warn',
    'vue/no-mutating-props': 'warn',
  },
};
