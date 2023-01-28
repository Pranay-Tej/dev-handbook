---
id: express-static
title: Serve Static Pages
sidebar_label: Serve Static Pages
---

## `express.static()`

- Create `public/` folder
- Create static pages
  - Example: index.html; about/about.html
- require `path`
- Use `express.static()` as middleware

```js filename="app.js"
const path = require("path");

app.use("/static", express.static(path.join(__dirname, "public")));

// OR
// for complete static site

app.use(express.static(path.join(__dirname, "public")));
```
