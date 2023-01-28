---
id: sass-extend
title: Extend
sidebar_label: Extend
---

## @extend

- Extending helps to re-use styles for variants of components
- Example: `.btn-primary`, `.btn-secondary` can extend from `.btn` and add styles on top

```scss
%btn{
  display: inline-block;
  border-radius: 4px;
  padding: 0.2em 1em;
  margin: 0.2em;
}

.btn-primary{
  @extend %btn;
  background-color: red;
}

.btn-secondary{
  @extend %btn;
  background-color: blue;
}
```
