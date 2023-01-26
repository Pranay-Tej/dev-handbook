---
id: react-http
title: HTTP
sidebar_label: HTTP
---

## fetch

```ts title="App.tsx"
fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  .then((response) => response.json())
  .then((json) => console.log(json));
```

### HTTP headers

```ts title="App.tsx"
fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo_json)
    }).then((response) => response);
```

---

## request

- Source: [npm package](https://www.npmjs.com/package/request)

```ts title="App.tsx"
request(
  "https://jsonplaceholder.typicode.com/todos/1",
  (error, response, body) => {
    console.error("error:", error); // Print the error if one occurred
    if (!error && response.statusCode == 200) {
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body);
    }
  }
);
```

### HTTP headers

```ts title="App.tsx"
request(
  {
    url: 'https://api.github.com/repos/request/request',
    headers: {
      'User-Agent': 'request'
    }
  },
  (error, response, body) => {
        console.error("error:", error); // Print the error if one occurred
        if (!error && response.statusCode == 200) {
          console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
          console.log("body:", body);
        }
      }
 )
```
---

## Use services

- Use separate files to make http calls
- Read [Services](react-services)