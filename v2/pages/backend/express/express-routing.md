---
id: express-routing
title: Routing
sidebar_label: Routing
---

## Routes

```js filename="app.js"
app.get("/", (req, res) => {
  res.send("Home!");
});

app.get("/users", (req, res) => {
  res.send("Users!");
});

app.get("/articles", (req, res) => {
  res.send("Articles!");
});
```

---

## Route Parameters

- Access Route Parameters as `req.params.parameter_name`
- Example: `localhost:3000/articles/16`, where 16 is parameter

```js filename="app.js"
app.get("/articles/:id", (req, res) => {
  res.send(`Article ${req.params.id}`);
});
```

- Multiple parameters are possible

```js filename="app.js"
app.get("articles/:year/:month", (req, res) => {
  res.send(`${req.params.year} ${req.params.month}`);
});
```

---

## Route Parameter Queries

- Access Route Parameter Queries as `req.query.query_name`
- Example: `localhost:3000/articles?orderBy=name&userId=1618`

```js filename="app.js"
app.get("/articles", (req, res) => {
  res.send(`Ordered by: ${req.query.orderBy} ${req.query.userId}`);
});
```
