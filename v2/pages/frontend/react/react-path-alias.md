---
id: react-path-alias
title: Path Alias
sidebar_label: Path Alias
---

## TS,JS Config

- Update config in `jsconfig.json` or `tsconfig.json`

```js filename="tsconfig.json"
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["./src"]
}
```

## Vite

- Update `vite.config.js` or `vite.config.ts` to setup path alias

```ts filename="vite.config.ts"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```
