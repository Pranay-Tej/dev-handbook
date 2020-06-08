---
id: express-hello-world
title: Hello World
sidebar_label: Hello World
---

```js title="app.js"
const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(3000);
```
