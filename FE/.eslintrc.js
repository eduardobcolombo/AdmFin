// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    // https://github.com/vuejs/eslint-plugin-vue#bulb-rules
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'vue'
  ],
  settings: {
    // Conflict with the eslint-plugin-html - https://github.com/vuejs/eslint-plugin-vue/issues/91
    'html/html-extensions': ['.html'],
    'html/indent': '0',
    'html/report-bad-indent': 2
  },
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'vue/order-in-components': 2,
    // enforce don't usage of this in template
    'vue/this-in-template': [2, 'never'],
    // enforce attribute naming style in template, use hyphenated name
    'vue/attribute-hyphenation': [2, 'always'],
    // enforce quotes style of HTML attributes
    'vue/html-quotes': [2, 'double'],
    // enforce the maximum number of attributes per line
    'vue/max-attributes-per-line': [2, {
      'singleline': 8, // default is 3
      'multiline': {
        max: 1,
        allowFirstLine: false
      }
    }],
    // enforce unified spacing in mustache interpolations
    'vue/mustache-interpolation-spacing': [2, 'always'],
    // enforce specific casing for the name property in Vue components
    'vue/name-property-casing': [2, 'kebab-case'],
    // disallow multiple spaces
    'vue/no-multi-spaces': 2
  }
}
