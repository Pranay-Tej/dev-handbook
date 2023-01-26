---
id: vue-watchers
title: Watchers
sidebar_label: Watchers
---

```jsx
  watch: {
    volume(newValue, oldValue){
      if(newValue > oldValue && newValue === 16){
        alert('Listening to high volume may damage your hearing')
      }
    }
  }
```

immediate - execute on page load

```jsx
  data(){
    return {
      movie: 'Ironman'
    }
  }
  watch: {
    movie: {
      handler(newValue, oldValue){
        console.log('Calling API')
      },
      immediate: true
    }
  }
```

deep - watch nested properites of object and arrays

NOTE: immutable functions like array.concat return a new array, hence deep=true is not required `movieList = movieList.concat(['Hull'])`

```jsx
  data(){
    return {
      movieInfo: {
        title: '',
        actor: ''
      },
      movieList: ['Ironman', 'Spiderman']
    }
  }
  watch: {
    movieInfo: {
      handler(newValue, oldValue){
        console.log('Calling API')
      },
      deep: true
    }
  }
```

## Computed vs Watcher

- Computed
  - compose new data from existing sources
  - reduce length of variable deeply nested inside an object
- Watchers
  - check if property has changed to a value to perform some action
  - call API in response to change in application data
  - apply transitions
  