---
id: sass
title: Sass
sidebar_label: Overview
---

## Intro

- Sass is an extension to CSS

## Course

- [Marksheet](https://marksheet.io/sass-scss-less.html)

## Setup

- Sass files cannot be used directly
- Include compiled `styles.css` in `index.html`
  - `<link rel="stylesheet" href="styles.css">`
- VS Code
  - Install `Live Sass Compiler` extension
  - Click on `Watch Sass` button in the bottom bar
  - Extension will convert ALL `.scss` files into corresponding `.css` files
- npm
  - Install sass globally or use npx to compile `.scss` or `.sass` into `.css` file
  - Global
    - `npm i -g sass`
    - `sass styles.scss styles.css`
  - npx
    - `npx sass styles.scss styles.css`

- node-sass
- React Setup
- [Next Setup](../next/next#setup)
- Angular Setup

---

## Overview

- [Variables](sass-variables)
- [Nesting](sass-nesting)
- [Import](sass-import)
- [Mixins](sass-mixins)
- Conditionals
- [Extend](sass-extend)
- [Operators](sass-operators)
- Organize
