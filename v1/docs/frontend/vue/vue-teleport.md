---
id: vue-teleport
title: Teleport
sidebar_label: Teleport
---

allows to render a component at other dom node, even outside of #app Vue app

- create a dom element in html

```jsx
<div id="#app"></div>
<div id="portal-root"></div>
```

- use `<teleport>` tag around component

```jsx
<teleport to="#portal-root">
  <CustomPortal />
</teleport>
```

Useful to render modal, popup, tooltips in another root element

But the component still lies in Parent component code-wise and does not add any complexity

NOTE: the events will still bubble to parents according to vue tree

<a href="https://codesandbox.io/s/vishwas-vue-teleport-4z93t" _target="blank">CodeSandbox link</a>
