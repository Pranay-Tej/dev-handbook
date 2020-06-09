---
id: express-mongo
title: Working with MongoDB
sidebar_label: Working with MongoDB
---

## Connecting to Database

- Install mongoose ```npm i mongoose```

```js title="app.js"
const MONGO_URI = "mongodb://localhost:27017/express-demo"

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);
```
