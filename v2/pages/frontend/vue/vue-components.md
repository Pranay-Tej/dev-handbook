---
id: vue-components
title: Components
sidebar_label: Components
---

Reusable blocks of UI, which contain

- template
- script
- style

Use `v-base` with code snippets to create base

```jsx
<template>
  <div>
    {{ msg }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "Hello Vue!",
    };
  },
};
</script>

<style scoped>
</style>
```

Import and define component in App

```jsx
<template>
  <div>
    <Greet />
  </div>
</template>

<script>
import Greet from "./components/Greet.vue";
export default {
  name: "App",
  components: {
    Greet,
  },
  data() {
    return {
    };
  },
};
</script>
```

---

## Props

```jsx
<template>
  <div>Hello {{ name }}!</div>
</template>

<script>
export default {
  name: "Greet",
  props: ["name"],
};
</script>
```

```jsx
<template>
  <div>
    <Greet name="Vue" />
    <Greet :name="name" />
  </div>
</template>

<script>
import Greet from "./components/Greet.vue";
export default {
  name: "App",
  components: {
    Greet,
  },
  data() {
    return {
      name: "World",
    };
  },
};
</script>
```

To pass dynamic props use v-bind directive or shorthand v-bind `:name` 

Convention is to use kebab-case

### Prop Types

```jsx
props: {
  name: {
    type: String,
    required: true,
    default: 'Default Product name'
  }
  price: Number,
  in-stock: Boolean,
}

//App
<Product name="SomeName" :price="500" :in-stock="true" />
```

NOTE: Use v-bind for non-string values (numbers, booleans) to be typechecked correctly

---

## Non-Prop attributes

- If component returns a root element, non-prop attributes like id, class are applied to the root element
- If there is no root element, attribute is not applied to any elements
- If we want it to be applied to a specific element

```jsx
<template>
  <div>
    <h2 v-bind="$attrs">{{name}}</h2>
    <h3>{{price}}</h3>
  </div>
</template>

//App
<Product id="productTitle" :price="500 />
```

- if we don't want the root element to take the attribute, specify inheritAttrs

```jsx
//Product
export default{
  name: 'Product',
  data(){},
  inheritAttrs: false
}
```

---

## Provide Inject

Solution to avoid prop-drilling

- Provide value in App
- Inject in nested component

```jsx
//App
export default{
  name: 'App',
  provide: {
    username: 'Tony'
  }
}

//Settings
<p>{{username}}</p>
export default{
  name: 'Settings',
  inject: ['username']
}
```

NOTE: provide does not allow username to be accessed in app template. Change provide to a function to do so

```jsx
//App
<p>{{username}}</p>
export default{
  name: 'App',
  data(){
    return{
      name: 'Tony'
    }
  },
  provide() {
    return{
      username: this.name
    }
  }
}

//Settings
<p>{{username}}</p>
export default{
  name: 'Settings',
  inject: ['username']
}
```

---

## Component events

Use `emits` and `$emit` to trigger custom events and pass data with it

```jsx
//Popup
<button @click="$emit('close', 'Closing button')">Close button></button>
export default{
  name: 'Popup',
  emits: ['close']
}

//App
<Popup v-if="showPopup" @close="closePopup">Close button></button>
export default{
  name: 'Popup',
  methods: {
    closePopup(data){
      this.showPopup = false;
      console.log(data) // logs 'Closing button'
    }
  }
}
```

### Validating component events

```jsx
emits: {
  close: (msg) => {
    if(!msg){
      return false
    }else{
      return true
    }	
  }
}
```

---

## v-model with Components

emit `update:modelValue` to listen to input change

```jsx
//CustomInput
<input
	type="text"
	:value="modelValue"
	@input="$emit('update:modelValue', $event.target.value)"
/>
export default{
  name: 'CustomInput'.
  props: {
    modelValue: String
  }
}

//App
<CustomInput v-model="title" />
export default{
  name: 'App'.
  data() {
    return {
      title: 'Mistborn'
    }
  }
}
```

---

## Component Styles

By default styles are applied globally

In this case, red is applied according to normal css (bottom most override takes preference)

```jsx
// App
<style>
h4{
  color: green;
}
</style>

// Child
<style>
h4{
  color: red;
}
</style>
```

`scoped` attribute applied style to only its own HTML elements

NOTE: even with scoped, parents styles will apply to the childs ROOT element for layout purposes

NOTE: when using slots parents styles will take preference

```jsx
<style scoped>
```

Check CSS modules with vue

---

## Dynamic Components

Tab with different components can be done with v-if and managing activeTab state, but this is very verbose and not optimal

use `<component :is="registeredName" />` to render component

```jsx
<button @click="activeTab = 'TabA'">TabA</button>
<button @click="activeTab = 'TabB'">TabB</button>
<component :is="activeTab" />

import TabA from "./components/TabA.vue";
import TabB from "./components/TabB.vue";
export default {
  name: "App",
  components: {
    TabA,
    TabB,
  },
  data() {
    return {
      activeTab: "TabA",
    };
  },
};
```

### Keeping alive dynamic components

In the above case if we have multi step form divided into tabs, switching between tabs clears entered data as vue creates new instance each time for performance

use `<keepalive>` tag to keep the component alive between switches

```jsx
<keepalive>
	<component :is="activeTab" />
</keepalive>
```
