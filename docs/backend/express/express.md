---
id: express
title: Express
sidebar_label: Express
---

## Courses

- [Mosh YouTube](https://www.youtube.com/watch?v=pKd0Rpw7O48)
- [DevEd YouTube](https://www.youtube.com/watch?v=vjf774RKrLc)

## Setup

### Linux

#### Manual Setup

- Install node
- Make a folder ```express-demo```
- Go to the folder ```cd express-demo```
- ```npm init --yes``` &rarr; creates ```package.json```
- ```npm i express``` &rarr; Install express
- ```npm i nodemon``` &rarr; Install nodemon &rarr; reloads application on changes
- Create ```app.js``` in root directory
- Add script to run app.js ```package.json```

```js title="package.json"
{
    "scripts": {
        "start": "nodemon app.js",
    },
}
```

- ```npm run start``` &rarr; Run app

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
