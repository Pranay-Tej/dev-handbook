---
id: sass-import
title: Import
sidebar_label: Import
---

## `@import`

- Imports help to keep the styles separate and organized
- In plain CSS, imports make multiple HTTP requests
- Sass imports are handled during compilation

## Partials

- Files starting with underscore `_` will be treated as partials
- They will not be compiled into css

```scss title="_reset.scss"
a{
  text-decoration: none;
  color: inherit;
}

li{
  list-style: none;
}
```

```scss title="_base.scss"
body{
  font: 100% $font-stack;
  color: $primary-color;
}
```

```scss title="styles.scss"
@import 'reset', 'base';
```
