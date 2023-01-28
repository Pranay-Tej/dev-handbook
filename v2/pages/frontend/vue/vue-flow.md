---
id: vue-flow
title: Flow
sidebar_label: Flow
---

- index.html has a div with `#app`
- main.js file creates Vue app with App.vue and mount to `#app` div

```html filename="index.html"
<html lang="en">
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

```javascript filename="main.js"
import { createApp } from "vue";
import App from "./App.vue";

createApp(App).mount("#app");
```

## Vue files

- vue files are custom files with HTML like syntax
- each vue file contains
  - template
  - script
  - style
- vue files are single file components (SFC)
