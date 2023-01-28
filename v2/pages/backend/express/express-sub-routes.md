---
id: express-sub-routes
title: Sub-routes
sidebar_label: Sub-routes
---

## Separate files for routes

### Define a router

- Create folder `routes/`
- Create file `articles.js`
- import `express.Router()`
- `express router` has same capabilities as `express app` but cannot listen to port
- Add routes
- export router

```js filename="articles.js"
const express = require("express");

const router = express.Router();

// is equivalent to '/articles'
router.get("/", (req, res) => {
  res.send("Articles!");
});

// is equivalent to '/articles/:id'
router.get("/:id", (req, res) => {
  res.send(`Article ${req.params.id}`);
});

module.exports = router;
```

### Register route in main router

- Import routes in `app.js`
- Register `/articles` route using `app.use()`

```js filename="app.js"
const articleRoutes = require("./routes/articles");

// Middleware
app.use("/articles", articleRoutes);
```

---

## Router Verb Methods

- Use `router.route()` method and chain `get()`, `post()`, `put()` and `delete()` for clean code structure

```js filename="articles.js"
const express = require("express");

const router = express.Router();

// /articles
router
  .route("/")
  .get((req, res) => {
    res.send("Get All Articles!");
  })
  .post((req, res) => {
    res.send("Create new Article!");
  });

// /article/id
router
  .route("/:id")
  .get((req, res) => {
    res.send("Get Article by Id!");
  })
  .put((req, res) => {
    res.send("Update Article by Id!");
  })
  .delete((req, res) => {
    res.send("Delete Article by Id!");
  });

module.exports = router;
```
