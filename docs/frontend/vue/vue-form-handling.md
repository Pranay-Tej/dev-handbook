---
id: vue-form-handling
title: Form Handling
sidebar_label: Form Handling
---

## v-model

```jsx
<input v-model="message" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

- automatically works for
  - text
  - text-area
  - select
  - multiple select
- v-model will ignore the initial value, checked or selected attributes found on any form elements. It will always treat the current active instance data as the source of truth. You should declare the initial value on the JavaScript side, inside the data option of your component.

- checkbox
  - custom value

  ```jsx
  <input type="checkbox" id="remoteWork" v-model="formValues.remoteWork" true-value="yes" false-value="no" />
  ```

  - checkbox group

  ```jsx
  <div>
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>
    <br />
    <span>Checked names: {{ checkedNames }}</span>
  </div>

  data() {
    return {
      checkedNames: []
    }
  }
  ```

## submit

- use submit event on form
- `.prevent` to apply event.preventDefault

```jsx
<form @submit.prevent="saveTodo"></form>
```

---

## Advanced (validations, dynamic forms)

For validations and complex form management examples follow this <a href="https://github.com/Pranay-Tej/vue-forms" _target="blank">GitHub repo</a>

- Text Input
- Number Input
- Select
- Multi Select
- Radio
- Checkbox
- Date
- Form Array
- Dynamic Form Array
- Nested Group
- Array of Groups
- API Populate
- Vuelidate Validations

