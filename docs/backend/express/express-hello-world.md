---
id: express-hello-world
title: Hello World
sidebar_label: Hello World
---

- Create app.js

```js title="app.js"
const express = require('express');

const app = express();

app.get('/', (req,res) => {
    res.send('Hello World!');
});

app.listen(3000, () => console.log("Listening on port 3000"));
```

- ```npm run start```
- Go to ```localhost:8080/3000``` in browser or Postman
