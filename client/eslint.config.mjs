import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2020, // Specify the ECMAScript version you are using
        sourceType: 'module',
      },
    },
  },
  {
    // Add the settings for React at the root level
    settings: {
      react: {
        version: 'detect', // Automatically detect the installed React version
      },
    },
  },
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
