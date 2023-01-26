---
id: react-env
title: Environment Variables
sidebar_label: Environment Variables
---

## Set environment variables

- Source: [CreateReactApp Docs](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- Set env variables in format `REACT_APP_ENV_NAME`
- Access in javascript as below

```jsx title="App.js"
console.log(process.env.REACT_APP_ENV_NAME)
```

---

## Read default variables

- Use different API for development and production modes

```js title="config.js"
if(process.env.NODE_ENV =="production"){
  // use remote API
}else{
  // use local API
}
```
