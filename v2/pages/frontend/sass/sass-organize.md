---
id: sass-organize
title: Organize
sidebar_label: Organize
---

- Organizing scss files helps to modify the styles with ease

```scss filename="_variables.scss"
// colors
$blue: #1d90ff;
$primary-color: $blue;

// Fonts
$roboto: "Roboto", sans-serif;
$primary-font: $roboto;
```

```scss filename="_mixins.scss"
@mixin flex($position, $direction: row) {
  display: flex;
  flex-direction: $direction;
  align-items: center;
  justify-content: $position;
}
```

```scss filename="_reset.scss"
a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style: none;
}
```

```scss filename="_base.scss"
body {
  font: $primary-font;
}
```

Import all files into a single scss file

```scss filename="styles.scss"
@import "variables", "mixins", "reset", "base";

.box {
  color: $primary-color;
  @include flex(center);
}
```
