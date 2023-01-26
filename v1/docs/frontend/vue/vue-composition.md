---
id: vue-composition
title: Composition
sidebar_label: Composition
---

Composition API is another way to write components in Vue

Options API data, methods, computed, watchers lifecycle methods

Advantages

- Easier to manage
- group by feature (count data, increment, decrement all at same place)
- re-usable logic blocks (like react cusom hooks)
- Can be mixed along with options API

---

## Data

### with ref

```jsx
import { ref } from 'vue
export default {
  setup(){
    const msg = ref('Hello world!')

    return {
      msg
    }
  }
}
```

`ref` function returns reactive mutable reference to an object

use `.value` to read of mutate the ref's value

value is automatically unpacked in template `{{msg}}`

```jsx
const name = ref('World')
// set
name.value = 'Tony'
// read
const msg = ref(`Hello ${name.value}`)
```

### with reactive

```jsx
import { reactive } from 'vue
export default {
  setup(){
    const state = reactive({
      name: 'Tony'
    })
  
    const msg = `Hello ${state.name}`

    return {
      msg
    }
  }
}
```

If state only has primitive values ref is easier to use as reactive only accepts objects

```jsx
setup(){
  const isLoggedInRef = ref(true)
  const state = reactive({
    isLoggedin: true
  })
}
```

NOTE: for variables without ref or reactive vue does NOT react to their changes

NOTE: while returning from setup() if we return individual values of state vue does NOT react

```jsx

<p>{{firstName}} {{lastName}}</p>

setup(){
  const state = reactive({
    firstName: 'Tony',
    lastName: 'Stark'
  })
  // WRONG
  return {
    firstName : setup.firstName,
    secondName: setup.secondName
  }
}
```

to solve this vue provides `toRef` function

- Can be used to create a ref for a property on a source reactive object. The ref can then be passed around, retaining the reactive connection to its source property.

```jsx
const fooRef = toRef(state, 'foo')

fooRef.value++
```

```jsx

import toRefs from 'vue'

<p>{{firstName}} {{lastName}}</p>

setup(){
  return toRefs(state)
}
```

---

## Methods

All methods inside setup() are automatically treated as methods

Return the method in setup() return object

```jsx
setup(){
  const count = ref(0)
  function increment(){
    count.value++;
  }
  return { count, increment }
}
```

NOTE: v-model works with both data() and setup()

---

## Computed

```jsx
import {computed} from 'vue'

setup(){
  const fullName = computed(function(){
    return `${firstName.value} ${lastName.value}`
  })
  return { fullName }
}
```

NOTE: computed properties also need `.value` to read or write in script

---

## Watchers

### with refs

```jsx
import {watch} from 'vue'

setup(){
  const count = ref('0)

  watch(count, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  return { count }
}
```

watch multiple with array, new and old values are arrays as well

```jsx
watch([firstName, lastName], (newValues, oldValues) => {
  const [newFirstName, newLastName] = newValues
  const [oldFirstName, oldLastName] = oldValues
  console.log(newValues, oldValues)
}, {
  // extra options in third argument object
  immediate: true
})
```

### with reactive

NOTE: the below function will have both newValue and oldValue same to fix this we need to pass a copy to the first argument of function

```jsx
const state = reactive({
  firstName: '',
  secondName: '',
})

// will NOT work
watch(state, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}

// passing copy of state
watch(() => { return {...state} }, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}

// =============================================
// for single value
// will NOT work properly
watch(state.firstName, (newValue, oldValue) => {
  console.log(newValue, oldValue)
}

// passing copy of state field value
watch(() => state.firstName, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }
}
```

NOTE: watch deep will not work with nested state object. We need to manually use some library to pass deep copied object as first argument

```jsx
// lodash cloneDeep
const state = reactive({
  firstName: '',
  hero: {
    superHeroName: ''
  }
})

watch(() => _.cloneDeep(state), (newValue, oldValue) => {
  console.log(newValue, oldValue)
  }, {
    deep: true
  }
}
```

---

## Provide/Inject

Can pass values as well as methods to children

```jsx
// Parent
import { provide, ref } from 'vue'

setup(){
  const msg = ref('Hello')
  function changeMsg(){
    msg.value = 'World';
  }
  provide('msg', msg)
  provide('change', change)
  return { msg, increment }
}

// Grand Child
import { inject } from 'vue'

setup(){
  const msg = inject('msg', 'Default msg')
  const increment = inject('increment')
  return { msg, increment }
}
```

---

## Lifecycle hooks

created, beforeCreated are not necessary as setup() is replacing them. Those should be written directly in setup() now

```jsx
//mounted(){}
onMounted(() ⇒ {
  console.log('Before mounted)
})
```

---

## Template refs

```jsx
<input ref="inputRef" />

import { ref } from 'vue'
setup(){
  // use same name defined in ref attribute
  const inputRef = ref(null)

  onMounted(() => {
    inputRef.value.focus()
  })
}
```

---

## Props

```jsx
<p>{{fullName}}</p>

setup(props){
  const fullName = computed(() => `${props.firstName} ${props.lastName}`)
  return { fullName }
}
```

---

## Component events

NOTE: context object has attrs, emit, slots

```jsx
// Parent
<todo @deleteTodo="deleteTodo" />
setup(){
  deleteTodo(todoId){
    console.log(`Deleting ${todoId}`)
  }
}

// Child
<button @click="deleteTodo">D</button>
setup(props, context){
  function deleteTodo(){
    context.emit('deleteTodo', props.todo.id)
  }
  return { deleteTodo }
}
```

---

## Reusable Logic / Composables

Create /composables/counter.js

```jsx
import {ref} from 'vue'
export default function useCounter(initialCount = 0, stepSize = 1){
  const count = ref(initialCount)
  function increment(){
    count.value += stepSize
  }
  return { count, incrementCount }
}
```

```jsx
// ClickCounter
<button @click="increment">Inc</button>

import 'useCounter' from './composables.useCounter'

setup(){
  const { count, increment } = useCounter(0, 1)
  return { count, increment }
}

// Hover
<button @mousover="increment">Inc</button>

import 'useCounter' from './composables.useCounter'

setup(){
  const { count, increment } = useCounter(100, 10)
  return { count, increment }
}
```
