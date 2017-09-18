// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    "comma-dangle": "off",
    "import/prefer-default-export": "off",
    "indent": [
      "error",
      "tab",
      {
        "SwitchCase": 1
      }
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
    "no-else-return": "off",
    "no-mixed-spaces-and-tabs": "off",
    "no-restricted-syntax": "off",
    "no-tabs": "off",
    "no-unused-vars": [
      "warn",
      {
        "ignoreRestSiblings": true
      }
    ],
    "object-curly-spacing": "off",
    "object-shorthand": "off",
    "quotes": [
      "error",
      "double"
    ],
    "semi": [
      "error",
      "never"
    ],
    // "flowtype/boolean-style": [
    //   "error",
    //   "boolean"
    // ],
    // "flowtype/define-flow-type": "off",
    // "flowtype/delimiter-dangle": [
    //   "error",
    //   "never"
    // ],
    // "flowtype/generic-spacing": [
    //   "error",
    //   "never"
    // ],
    // "flowtype/no-primitive-constructor-types": "error",
    // "flowtype/no-types-missing-file-annotation": "error",
    // "flowtype/no-weak-types": "off",
    // "flowtype/object-type-delimiter": [
    //   "error",
    //   "comma"
    // ],
    // "flowtype/require-parameter-type": "error",
    // "flowtype/require-return-type": [
    //   "error",
    //   "always",
    //   {
    //     "annotateUndefined": "never"
    //   }
    // ],
    // "flowtype/require-valid-file-annotation": "error",
    // "flowtype/semi": [
    //   "error",
    //   "always"
    // ],
    // "flowtype/space-after-type-colon": [
    //   "error",
    //   "always"
    // ],
    // "flowtype/space-before-generic-bracket": [
    //   "error",
    //   "never"
    // ],
    // "flowtype/space-before-type-colon": [
    //   "error",
    //   "never"
    // ],
    // "flowtype/type-id-match": [
    //   "error",
    //   "^([A-Z][a-z0-9]+)+Type$"
    // ],
    // "flowtype/union-intersection-spacing": [
    //   "error",
    //   "always"
    // ],
    // "flowtype/use-flow-type": "off",
    // "flowtype/valid-syntax": "off",
    // "react/prop-types": "off",
    // "react/jsx-tag-spacing": [
    //   "error",
    //   {
    //     "beforeSelfClosing": "never",
    //     "afterOpening": "never"
    //   }
    // ],
    // "react/jsx-uses-react": "error",
    // "react/jsx-uses-vars": "error",
    // "react/jsx-indent": "off",
    // "react/jsx-indent-props": "off",
    // "react/jsx-closing-bracket-location": "off",
    // "jsx-a11y/no-static-element-interactions": "off",
    // "react/jsx-no-bind": "off",
    // "space-before-function-paren": "off",
    // "no-mixed-operators": "off",
    // "linebreak-style": "off",
    // "jsx-a11y/href-no-hash": "off"
  },

}
