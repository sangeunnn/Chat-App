module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "airbnb"  
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    }, 
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {

         /**
     * Basic rules
     */
    "brace-style": "off",
    'camelcase': 1,
    'no-console': [2, { allow: ['error'] }],
    'no-unused-vars': 'off',
    "no-use-before-define": 'off',
    'lines-between-class-members': 1,
    'no-trailing-spaces': [
      'error',
      { ignoreComments: true }  
    ],
    'class-methods-use-this': 0,
    'no-underscore-dangle': 'off',
    'comma-dangle': 2,
    'linebreak-style': 'off',
    'no-useless-constructor': 0,
    'max-len': ["error", {
      code: 120, tabWidth: 2, ignoreComments: true, ignoreTrailingComments: true, ignoreStrings: true,
      ignoreUrls: true, ignoreTemplateLiterals: true,
      ignorePattern: "^import\\s.+\\sfrom\\s.+;$",
    }],
    'max-params': ["warn", 4],
    "no-shadow": 2,
    /**
     * import rules
     */
    "import/no-extraneous-dependencies": [0, {"devDependencies": ["**/*.test.js", "**/*.spec.js"]}],
    'import/no-cycle': 0, // disable dependency cycle for this project
    'import/prefer-default-export': 0, // please use import
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never'
      }
    ],

    }
};
