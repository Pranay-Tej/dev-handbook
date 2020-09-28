---
id: react-typescript
title: TypeScript Setup
sidebar_label: TypeScript Setup
---

## Source

- Source: [create-react-app docs](https://create-react-app.dev/docs/adding-typescript/)

---

## Create new rect app with typescript support

- Use create-react-app template

```bash
npx create-react-app my-app --template typescript
```

---

## Add TypeScript to existing react app

- Add dependencies

```bash
cd existing-react-app
npm install typescript @types/node @types/react @types/react-dom @types/jest
```

- Rename existing `jsx` files to `tsx`
  - Example: `index.jsx` &rarr; `index.tsx`

- Run app with  ```npm run start```
