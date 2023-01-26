---
id: vue-computed
title: Computed Properties
sidebar_label: Computed Properties
---

Used to compose new data from existing resources

Will only update when the original data changes

Very useful for list filtering

example: calculate total order amount

```jsx
<p>{{ fullName }}</p>

  data(){
    return {
      firstName: 'Tony',
      lastName: 'Starl'
    }
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`
    }
  }
```

## Vs Methods

- Computed properties are cached and hence improve performance
- If some other data changes, computed properties are not calculated again. But the method will re-run in this case too

## Conditional rendering

```jsx
  <p v-for="item in expensiveItems" :key="item.id" >{{ item.name }}</p>

  computed: {
    expensiveItems(){
      return this.items.filter(item => item.price > 3 )
    }
  }
```

## Setters

Computed properties are read-only by default

```jsx
  computed: {
    fullName: {
      get(){
        return `${this.firstName} ${this.lastName}`
      },
      set(value){
        const names = value.split(' ')
        this.firstName = names[0]
        this.lastName = names[1]
      }
    }
  },

  methods: {
    changeFullName(){
      // this will trigger setter
      this.fullName = 'Steve Rogers'
    }
  }
```
