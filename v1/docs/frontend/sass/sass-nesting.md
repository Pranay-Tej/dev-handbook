---
id: sass-nesting
title: Nesting
sidebar_label: Nesting
---

## Hierarchy

Nesting helps in maintaining clean hierarchy

```scss
.box{
  background-color: blue;
  .element{
    background-color: red;
  }
}
```

Above code is compiled to:

```scss
.box{
  background-color: blue;
}
.box .element{
  background-color: red;
}
```
---

## `&` Symbol

### Pseudo selectors

```scss
.box{
  background-color: blue;

  &:hover{
    background-color: red;
  }
}
```

Above code is compiled to:

```scss
.box{
  background-color: blue;
}
.box:hover{
  background-color: red;
}
```

### Joined classes

```scss
.box{
  background-color: blue;

  &.heading{
    font-weight: bold;
  }
}
```

Above code is compiled to:

```scss
.box{
  background-color: blue;
}
.box.heading{
  font-weight: bold;
}
```

