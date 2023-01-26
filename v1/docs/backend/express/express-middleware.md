---
id: express-middleware
title: Middleware
sidebar_label: Middleware
---

## Order

- Middleware are functions that run before routes
- Routes and middleware are executed in order they are specified

---

## Third-Party Middleware

- Add third party middleware before routes
- In this case using cors middleware allows Cross-Origin Resource Sharing

```js title="app.js"
// Middleware
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});
```

---

## Custom Middleware

- Use `next()` function to pass the control to middleware or route which is next in order
- In this case `testMiddlware()` is called before `/hello` route is executed

### Functions

```js title="app.js"
// Middleware
const testMiddleware = (req,res,next) => {
    console.log('testMiddleware activated');
    next();
}

// Routes
app.get('/hello', testMiddleware, (req, res) => {
    res.send('Hello World!');
});
```

- Multiple functions can be added as middleware
- They will be executed in order

```js title="app.js"
// Routes
app.get('/hello', [testMiddlewareOne, testMiddlewareTwo], (req, res) => {
    res.send('Hello World!');
});
```

### With `app.use()`

```js title="app.js"
// Middleware
app.use('/hello', (req,res,next) => {
    console.log('testMiddleware activated');
    next();
}

// Routes
app.get('/hello', (req, res) => {
    res.send('Hello World!');
});
```

- Multiple middleware

```js title="app.js"
// Middleware
app.use('/hello', (req,res,next) => {
    console.log('testMiddlewareOne activated');
    next();
}

// Routes
app.use('/hello', (req,res,next) => {
    console.log('testMiddlewareTwo activated');
    next();
}
```

---

## Pass Data

- Data can be passed from middleware to route as reqBody variable

```js title="app.js"
// Middleware
app.use('/hello', (req,res,next) => {
    console.log('testMiddleware activated');
    req.body.someData = 'someDataFromMiddleware';
    next();
}

// Routes
app.get('/hello', (req, res) => {
    console.log(req.body.someData);
    res.send('Hello World!');
});
```

---

- Middleware CAN respond to requests using `res`. But it is not what they are designed to do