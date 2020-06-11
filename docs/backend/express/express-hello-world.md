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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
```

- ```npm run start```
- Go to ```localhost:3000``` in browser or Postman
