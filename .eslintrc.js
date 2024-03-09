module.exports = {
  parser: require.resolve('@typescript-eslint/parser'),
  extends: ['airbnb-typescript', 'plugin:@typescript-eslint/recommended'],
  env: { 'browser': true, 'jest': true, 'es6': true },
  plugins: ['react', 'jsx-a11y'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: { 'jsx': true },
    project: ["./tsconfig.json"],
  },
  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-typescript')]: {
        "alwaysTryTypes": true
      },
    },
  },
  rules: {
    'no-restricted-globals': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': 'off',
    'no-implicit-coercion': ['error', {
      boolean: true,
      number: true,
      string: true,
      allow: [],
    }],
    '@typescript-eslint/ban-types': ['error',
      {
        types: {
          object: false
        },
        extendDefaults: true
      }
    ],
    '@typescript-eslint/object-curly-spacing': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'class-methods-use-this': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    'import/extensions': 'warn',
    'import/first': 'error',
    'import/newline-after-import': ['error', { 'count': 2 }],
    'import/no-extraneous-dependencies': 'off',
    'import/no-named-as-default': 'off',
    'import/no-unresolved': 'off',
    'import/no-webpack-loader-syntax': 'warn',
    'import/order': ['error', {
      'groups': [['builtin', 'external'], ['internal'], ['index', 'sibling', 'parent']],
      'newlines-between': 'always'
    }],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/indent': ['error', 2, { 'SwitchCase': 1 }],
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/label-has-associated-control': [ 'error', {
      required: {
        some: [ 'nesting', 'id'  ]
      }
    }],
    'jsx-a11y/label-has-for': [ 'error', {
      required: {
        some: [ 'nesting', 'id'  ]
      }
    }],
    'jsx-a11y/mouse-events-have-key-events': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error',
    'max-len': ['error', { 'code': 120, 'ignoreStrings': true }],
    'max-classes-per-file': 'off',
    'newline-per-chained-call': 'off',
    'no-console': 'error',
    'no-lonely-if': 'off',
    'no-multiple-empty-lines': ['error', { 'max': 2, 'maxBOF': 0 }],
    'no-plusplus': 'off',
    'no-restricted-imports': ['error', { 'patterns': ['../../../../*'] }],  // restrict relative imports with from parent of parent
    'no-restricted-syntax': 'off',
    'no-use-before-define': 'off',
    'no-useless-escape': 'off',
    'no-negated-condition': 'error',
    'object-curly-newline': ['warn', { 'multiline': true, 'minProperties': 5, 'consistent': true }],
    'object-property-newline': 'off',
    'prefer-const': 'warn',
    'prefer-template': 'error',
    'react/forbid-prop-types': 'warn',
    'react/jsx-fragments': 'off',
    'react/jsx-key': 'error',
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': 'warn',
    'react/jsx-props-no-spreading': ['error', {
      html: 'enforce',
      custom: 'ignore',
      exceptions: ['div', 'circle']
    }],
    'react/state-in-constructor': ['error', 'always'],
    'react/prop-types': 'off',
    'react/static-property-placement': ['error', 'static public field'],
    'react/no-array-index-key': 'off',
    'react/prefer-stateless-function': 'off',
    'react/require-default-props': 'off',
    'react/require-extension': 'off',
    'react/self-closing-comp': 'off',
    'valid-jsdoc': 'error',
    yoda: ['error', 'always', { 'onlyEquality': true }],
    'import/no-cycle': ['warn', { 'maxDepth': 1 }],
    'no-underscore-dangle': 'off',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'error',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    '@typescript-eslint/member-delimiter-style': ['error', {
      'multiline': { 'delimiter': 'comma', 'requireLast': true },
      'singleline': { 'delimiter': 'comma', 'requireLast': false }
    }],
    '@typescript-eslint/naming-convention': ['error',
      { 'selector': 'default', 'format': ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'] },
      { 'selector': 'typeLike', 'format': ['PascalCase'] },
      { 'selector': 'enum', 'format': ['UPPER_CASE'] },
      { 'selector': 'property', 'format': ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'] },
      { 'selector': 'parameter', 'format': ['camelCase', 'PascalCase', 'snake_case', 'UPPER_CASE'] },
      { 'selector': 'property', 'filter':  { 'regex': '^__overlayScrollbars__$', 'match': true }, 'format': null },
      { 'selector': 'parameter', 'filter':  { 'regex': '^_$', 'match': true }, 'format': null }
    ]
  }
};
