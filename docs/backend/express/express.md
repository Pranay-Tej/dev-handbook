---
id: express
title: Express
sidebar_label: Express
---

## Courses

- [Mosh YouTube](https://www.youtube.com/watch?v=pKd0Rpw7O48)
- [DevEd YouTube](https://www.youtube.com/watch?v=vjf774RKrLc)
- [Traversy YouTube](https://www.youtube.com/watch?v=L72fhGm1tfE)

## Setup

### Linux

#### Manual Setup

- Install node
- Make a folder ```express-demo```
- Go to the folder ```cd express-demo```
- ```npm init --yes``` &rarr; creates ```package.json```
- ```npm i express``` &rarr; Install express
- ```npm i -D nodemon``` &rarr; Install nodemon as devDependency &rarr; nodemon reloads application on changes to the code
- Create ```app.js``` in root directory
- Add script to run app.js in ```package.json```

```js title="package.json"
{
    "scripts": {
        "dev": "nodemon app.js",
        "start" : "node app.js"
    },
}
```

- ```npm run dev``` Run app in development mode
- ```npm run start``` &rarr; Run app in production mode

#### Express Generator Setup

- Install node
- Create folder ```express-demo```
- Go to the folder ```cd express-demo```
- ```npx express-generator``` &rarr; Create boilerplate code
- ```npm install``` &rarr; Install dependencies
- ```npm start``` &rarr; Start application

#### Express CLI Setup

- Install node
- Install express globally ```npm i -g express```
- ```express express-demo``` &rarr; creates and runs express app
- ```npm install``` &rarr; install dependencies
- ```npm start``` &rarr; run application

## Checklist

- [Hello World](express-hello-world)
- [Routes](express-routes)
- [Requests](express-requests)
- [Serve Static Pages](express-static)
- [Working with MongoDB](express-mongo)
- [Environment Variables](express-env)
- Deployment
