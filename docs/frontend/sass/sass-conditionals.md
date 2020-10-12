---
id: sass-conditionals
title: Conditionals
sidebar_label: Conditionals
---

- If else conditionals can be used in Sass

```scss
@mixin border($width, $direction) {
  @if $direction == top {
    border-top: $width;
  } @else if $direction == bottom {
    border-bottom: $width;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}

.box {
  @include border(4px, top);
}

.rectangle {
  @include border(6px, bottom);
}
```
```
