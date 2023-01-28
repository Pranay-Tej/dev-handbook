---
id: react-typescript
title: TypeScript Setup
sidebar_label: TypeScript Setup
---

## Vite

### New app with typescript support

- Use react-ts template

```bash
npm init vite
# use react-ts template
cd project-name
npm run dev
```

### Add TypeScript to existing vite react app

- Add dependencies

```bash
npm install -D typescript @types/react @types/react-dom @types/jest
```

- Rename existing `js/jsx` files to `ts/tsx`

  - Example: `index.jsx` &rarr; `index.tsx`

- Run app with `npm run dev`

---

## Create React App

- Source: [create-react-app docs](https://create-react-app.dev/docs/adding-typescript/)

### New react app with typescript support

- Use create-react-app template

```bash
npx create-react-app my-app --template typescript
```

### Add TypeScript to existing react app

- Add dependencies

```bash
npm install -D typescript @types/node @types/react @types/react-dom @types/jest
```

- Rename existing `js/jsx` files to `ts/tsx`

  - Example: `index.jsx` &rarr; `index.tsx`

- Run app with `npm run start`
