---
id: express-typescript
title: TypeScript Setup
sidebar_label: TypeScript Setup
---

## TypeScript

- Install `typescript` globally

```bash
npm i -g typescript

cd express-ts
# initialize a tsconfig.json file
tsc --init
```

- Change the following values

```json filename="tsconfig.json"
"outDir": "./build" /* Redirect output structure to the directory. */
"moduleResolution": "node", /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
```

- Change `target` to `es6` for modern projects

```json filename="tsconfig.json"
"target": "es6", /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', or 'ESNEXT'. */

```

---

## `.gitignore`

```text filename=".gitignore"
# build files
build

# node modules
node_modules

#editor
.vscode

#config
.env
```

---

## npm

- Initialize a npm project

```bash
npm init -y
```

- Install dependencies

```bash
npm i express typescript @types/node @types/express
```

- Install dev dependencies

```bash
npm i -D ts-node nodemon
```

- Edit `scripts` in `package.json`

```js filename="package.json"
"scripts": {
    "start": "tsc && node ./build/app.js",
    "dev": "nodemon app.ts",
    "build": "tsc -p ."
},
```

- Use `npm run dev` for development
- Use `npm run start` for production

---

## Express app

- Create `app.ts` in root directory
- ES6 `import` can be used

```ts filename="app.ts"
// lib/app.ts
import express from "express";

// Create a new express application instance
const app: express.Application = express();

app.get(
  "/",
  function (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    res.send("Hello TypeScript!");
  }
);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

- Or import named exports as below

```ts filename="app.ts"
import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();

app.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.send("Hello TypeScript!");
});
```
