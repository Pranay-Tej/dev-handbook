---
id: vue-template-refs
title: Template Refs
sidebar_label: Template Refs
---

## Template refs

access html element with reference

use `ref` and `$refs`

Example: focus on input element on page load

```jsx
<input type="text" ref="emailRef"/>
<CustomComponent ref="compRef" />

mounted(){
  this.$refs.emailRef.focus()
}
```

Using ref on plain html element will refer to that element

Using ref on component will refer to component instance
