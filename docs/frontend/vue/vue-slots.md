---
id: vue-slots
title: Slots
sidebar_label: Slots
---

Allow to reuse a component

Allow parent component to control content inside a child

Can embed any content including HTML elements

slot will be replace by the content defined between the component tags inside its parent

```jsx
// Card
<div class="card">
  <slot>Default content</slot>
<div>

// App

<Card>
</Card>

<Card>
  <h2>Card Content 1</h2>
</Card>

<Card>
  <p>Card Content 1</p>
</Card>

<Card>
  <img src="some.jpg" />
</Card>
```

## Named slots v-slot

```jsx
//Card
<div class="card">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>

//App
<card>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</card>
```

## Slot props

By default parent and child have different scopes and cannot access each others data

To access child data inside parent when mentioning slots in a different manner

Send the data as slot props

```jsx
// NameList
<h2 v-for="name in names" :key="name.firstName">
  <slot :firstName="name.firstName" :lastName="name.lastName"></slot>
</h2>

//App
<NameList>
  <template v-slot:default="slotProps">
    {{ slotProps.firstName }} {{ slotProps.lastName }}
  </template>
</NameList>
<NameList>
  <template v-slot:default="slotProps">
    {{ slotProps.lastName }}, {{ slotProps.firstName }}
  </template>
</NameList>

```
