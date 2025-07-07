module.exports = {
  parser: '@typescript-eslint/parser', // Usa un analizador que entiende TypeScript
  extends: [
    'eslint:recommended',              // Reglas básicas recomendadas por ESLint
    'plugin:react/recommended',        // Reglas específicas para proyectos React
    'plugin:@typescript-eslint/recommended', // Reglas para TypeScript
    'prettier'                         // Evita que Prettier y ESLint choquen
  ],
  plugins: ['react', '@typescript-eslint'], // Plugins para React y TS
  parserOptions: {
    ecmaFeatures: {
      jsx: true                        // Permite código JSX (React)
    },
    ecmaVersion: 'latest',            // Soporte para funciones modernas de JS
    sourceType: 'module'              // Permite usar `import` / `export`
  },
  settings: {
    react: {
      version: 'detect'               // Detecta la versión de React automáticamente
    }
  },
  rules: {
    'react/react-in-jsx-scope': 'off' // No exige `import React` en cada archivo JSX
  }
};

