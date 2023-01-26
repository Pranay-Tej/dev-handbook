---
id: vue-event-handling
title: Event Handling
sidebar_label: Event Handling
---

## methods

- cannot use arrow functions

```jsx
data() {
  return { count: 4 }
},
methods: {
  increment() {
      // `this` will refer to the component instance
  this.count++
  }
}
```

- methods can be called directly inside template
- this keyword is not required when calling in template

```jsx
<h2>{{formatDate(date)}}</h2>
```

---

## Event handling

### v-on (or) @click

- event is automatically passed if no arguments
- multiple events can be triggered as comma separated to @click

```jsx
<button v-on:click="increment">Increment</button>

// shorthand
<button @click="decrement(5, $event)">Decrement</button>
<button @click="oneMethod, someOtherMethod">Multi Event</button>

  methods: {
    increment(event) {
        // `this` will refer to the component instance
        this.count++
      console.log(event)
    },
    decrement(amount, event){
      this.count -= 5;
      console.log(event)	
    }
  }
```