// @ts-check

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  extends: [
    // /!\ Order seems to matter
    "airbnb",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/react",

    // Already done by Airbnb
    //'plugin:react/recommended'
  ],
  plugins: ["prettier", "@typescript-eslint", "react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  env: {
    es6: true,
    browser: true,
    // node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-use-before-define": "off",
    // "@typescript-eslint/explicit-member-accessibility": [
    //   1,
    //   { accessibility: "no-public" },
    // ],
    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "react/destructuring-assignment": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "no-underscore-dangle": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "class-methods-use-this": "off",
  },
};
