import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";
import tsdoc from "eslint-plugin-tsdoc"

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  eslintConfigPrettier,
  {plugins:
    {tsdoc}
  },
  { rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "prefer-const": "warn",
    "tsdoc/syntax": "warn"
  }},
  {ignores: [
    "dist/*",
    "docs/*",
    "tests/*",
    "eslint.config.mjs"
  ]    
  }
]);
