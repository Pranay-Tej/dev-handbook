---
id: react-flow
title: Flow
sidebar_label: Flow
---

- index.html
  - Define an empty div with id as root
  - This is where react changes views dynamically

```html title="index.html"
<body>
    <div id="root"></div>
</body>
```

- index.js
  - Import React, ReactDOM
  - use ```ReactDOM.render(jsx or react_component, root_div)```

```js title="index.js"
import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(
  <p>Hello World!</p>, document.getElementById("root")
);
```