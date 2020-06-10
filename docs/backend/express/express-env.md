---
id: express-env
title: Environment Variables
sidebar_label: Environment Variables
---

## dotenv

- Install ```npm i dotenv```
- Create a file ```.env``` in root directory

```txt title=".env"
MONGO_URI = mongodb://localhost:27017/express-demo
```

- Add .env to ```.gitignore```

```txt title=".gitignore"
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