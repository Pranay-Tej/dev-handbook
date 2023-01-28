---
id: vue-data-binding
title: Data binding
sidebar_label: Data binding
---

## data

Set data for component with `data()` function which returns an object

```bash filename="App.vue"
<script>
export default{
  name: "App",
  data() {
    return{
      msg: 'World!'
    }
  }
}
</script>
```

## binding text

```html
<p>Hello {{msg}}</p>

or using directive

<p v-text="msg"></p>
```
