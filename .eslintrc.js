module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": ["jest"],
  "extends": ["plugin:@typescript-eslint/recommended", "plugin:jest/recommended", "@levibostian/eslint-config-node"],
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module"
  }
};