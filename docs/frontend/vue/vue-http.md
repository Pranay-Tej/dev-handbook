---
id: vue-http
title: HTTP
sidebar_label: HTTP
---

## HTTP

Use fetch or axios to make http calls

- fetch on page load

```jsx
data(){
  return {
    todos: []
  }
},
created(){
  this.fetchPosts()
},
methods: {
  fetchPosts(){
    // get api call response
    this.todos = response
  }
}
```