---
id: angular-folder-structure
title: Folder Structure
sidebar_label: Folder Structure
---

Source: Code with Mosh

- e2e &rarr; end-to-end tests
- node-modules &rarr; dependencies
- app &rarr; main app
- assets &rarr; static assets
- env
- favicon.ico
- index.html
- main.ts
- polyfills &rarr; javascript features that angular needs
- styles.css &rarr; global styles
- tests
- angular-cli.json &rarr; cli config
- .editorconfig
- karma.config.js &rarr; configuration for tests
- package.json &rarr; standard file for every node application, contains dependencies info
- protractor
- tsconfig.json
- tslint.json

---

- Angular CLI uses webpack to bundle typescript, style bundles
- Webpack compiles on any changes to files
- Adds/Injects bundles to index.html ```<scripts>``` tag at runtime
