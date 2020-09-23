---
id: express-env
title: Environment Variables
sidebar_label: Environment Variables
---

## dotenv

- Guide [Medium Article](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

- Install ```npm i dotenv```
- Create a file ```.env``` in root directory

```text title=".env"
MONGO_URI=mongodb://localhost:27017/express-demo
```

- Add .env to ```.gitignore```

```text title=".gitignore"
.env
node_modules
```

- require dotenv config in app.js

```js title="app.js"
require('dotenv').config()
```

- Access environment variables using ```process.env```

```js title="app.js"
mongoose.connect(

    process.env.MONGO_URI,

    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);
```
