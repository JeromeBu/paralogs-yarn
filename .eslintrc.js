// @ts-check

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    extraFileExtensions: [".js", ".yml", ".json", ".md", ".log"],
  },
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  plugins: [
    "prettier",
    "@typescript-eslint",
    "react",
    "react-hooks",
    "simple-import-sort",
  ],
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

    "@typescript-eslint/no-explicit-any": "off",
    "react/jsx-filename-extension": [1, { extensions: [".tsx"] }],
    "import/prefer-default-export": "off",
    "import/no-unresolved": "off",
    "react/destructuring-assignment": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": "off",
    "no-underscore-dangle": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "no-useless-constructor": "off",
    "no-empty-function": "off",
    "class-methods-use-this": "off",
    "react/jsx-props-no-spreading": "off",
    "@typescript-eslint/no-floating-promises": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "no-case-declarations": "off",
    "max-classes-per-file": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/camelcase": "off",
    "import/extensions": "off",

    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/sort": "error",
  },
};
