---
id: express-routing
title: Routing
sidebar_label: Routing
---

## Routes

```js title="app.js"
app.get('/', (req,res) => {
    res.send('Home!')
})

app.get('/users', (req,res) => {
    res.send('Users!')
})

app.get('/articles', (req,res) => {
    res.send('Articles!')
})
```

## Separate files for routes

- Create folder ```routes/```
- Create file ```articles.js```
- import ```express.Router()```
- Ddd routes
- export router

```js title="articles.js"
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Articles!')
})

module.exports = router
```

- Import routes in ```app.js```

```js title="app.js"

const articleRoutes = require('./routes/articles')

// Middleware
app.use('/articles', articleRoutes)
```

## Route Parameters

- Access Route Parameters as ```req.params.parameter_name```
- Example: ```localhost:3000/articles/16```, where 16 is parameter

```js title="articles.js"
router.get('/:id', (req, res) => {
    res.send(`Article ${req.params.id}`)
})
```

- Multiple parameters are possible

```js title="example.js"
router.get('/:year/:month', (req, res) => {
    res.send(`${req.params.year} ${req.params.month}`)
})
```

## Route Parameter Queries

- Access Route Parameter Queries as ```req.query.query_name```
- Example: ```localhost:3000/articles?orderBy=name&userId=1618```

```js title="articles.js"
router.get('/', (req, res) => {
    res.send(`Ordered by: ${req.query.orderBy} ${req.query.userId}`)
})
```
