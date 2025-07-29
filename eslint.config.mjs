import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], languageOptions: { globals: globals.node } },

  // ✅ Regras personalizadas da aula
  {
    files: ["**/*.{js,ts}"],
    rules: {
      indent: ["error", 4],                // 4 espaços
      quotes: ["error", "double"],         // aspas duplas
      semi: ["error", "always"],           // ponto e vírgula obrigatório
      "linebreak-style": ["error", "windows"]
    }
  },

  tseslint.configs.recommended,
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] }
]);
