---
id: vue-directives
title: Directives
sidebar_label: Directives
---

## v-text

render text to an element

---


```html
<p v-text="msg"></p>
```

## v-bind

- attribute binding

```html
<div v-bind:id="headingId">Some heading</div>
<button v-bind:disabled="isDisabled">SomeButton</button>

<script>
export default{
  name: "App",
  data() {
    return{
      headingId: 'mainHeading',
      isDisabled: true
    }
  }
}
</script>
```

- class
  - static and dynamic classes can both be used

```html
<div class="static-class" v-bind:class="[classA, { classDynamicB: isB, classDynamicC: isC }]">
```

- shorthand

```html
<button :disabled="isDisabled">SomeButton</button>
```

---

## v-if

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>

use <template> to avoid adding unnecessary div tags
<template v-if="isShown">
	<p>sometext</p>
	<p>extratext</p>
</template>
```

---

## v-show

- only changes 'display' property of element
- element is still in the DOM tree

---

## v-for (List rendering)

```html
<div v-for="(item, index) in items" :key="item"></div>
<div v-for="(value, key) in object" :key="value"></div>
<div v-for="(value, name, index) in object" :key="name"></div>
```

- key attribute lets vue know when elements change and compare to old dom tree
- key should be unique

---

## Conditional rendering

- v-for and v-if cannot be combined
- use enclosing template tag

```html
<div v-for="(item, index) in items" :key="item">
	<template v-if="item === 'specificItem'">{{item}}</template>
</div>
```

- or use computed properties

---

## Modifiers

Suffix added to v-on and v-model

Can be chained v-model.trim.lazy

- v-model.trim to trim spaces
- v-model.number convert string to number format (when instantation as null)
- v-model.lazy bind onChange event (trigger when input loses focus)
- v-on.prevent event.preventDefault
- v-on:click.stop event.stopPropogation
- v-on:keyup.enter trigger on specific key

## Bonus directives

v-once

v-pre does not compile, renders as it is
