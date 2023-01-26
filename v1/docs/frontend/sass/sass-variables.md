---
id: sass-variables
title: Variables
sidebar_label: Variables
---

- Variables help in maintaining the code.
- Update in one line affects all styles
- Units can be used for any type

```scss
// colors
$blue: #1d90ff;
$primary-color: $blue;

// Fonts
$roboto: 'Roboto', sans-serif;
$primary-font: $roboto;

// units
$nav-bar-height: 150px;

#nav-bar{
  color: $primary-color;
  height: $nav-bar-height;
}
```
