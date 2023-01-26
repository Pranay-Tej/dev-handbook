---
id: vue-mixins
title: Mixins
sidebar_label: Mixins
---

Counter

- on hover
- on click

Create a mixins/counter.js

```jsx
export default {
  data(){
    return{
      count: 0
  },
  methods: {
    increment(){
      this.count++;
    }
  }
}
```

Import mixin into ClickCounter.vue and HoverCounter.vue

```jsx
//ClickCounter
<button @click="increment">Inc</button>

import CounterMixin from 'mixins/counter'
export default {
  name: 'ClickCounter',
  mixins: [CounterMixin] 
}

// HoverCounter
<button @mouseover="increment">Inc</button>

mixins: [CounterMixin] 

```

Mixins can have

- data
- methods
- watchers
- computedProperties
- lifecycle methods

NOTE: if mixin and component have same data, components data takes preference. This is known as mixin conflict
