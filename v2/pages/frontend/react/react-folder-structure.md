---
id: react-folder-structure
title: Folder Structure
sidebar_label: Folder Structure
---

- package.json &rarr; contains dependencies and scripts for the project
- node_modules/ &rarr; location where dependencies are installed
- public/
  - favicon.ico &rarr; Icon shown on the browser tab
  - index.html &rarr; The only html page. View is dynamically changed (Single Page Application). This is the page served when ```npm run start``` is executed
- src/
  - index.js &rarr; starting point for the application
  - index.css &rarr; use for global-styles and css-variables
