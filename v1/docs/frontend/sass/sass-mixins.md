---
id: sass-mixins
title: Mixins
sidebar_label: Mixins
---

## `@mixin`

- Mixins help in re-using the code
- They are similar to functions in programming languages
- They can accept arguments

## `@include`

- Default values can be set for arguments
- Optional arguments must be at the last

```scss
@mixin flex($position, $direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: $position;
}

.box {
  @include flex(center);
}

.rectangle {
  @include flex(flex-start, column);
}
```

Above code is compiled to

```scss
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rectangle {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
```
