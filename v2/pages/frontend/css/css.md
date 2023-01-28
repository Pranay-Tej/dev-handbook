---
id: css
title: CSS
sidebar_label: Overview
---

## Intro

- [Scrimba](https://scrimba.com/course/gintrotocss)

## CSS Flexbox

- [Scrimba](https://scrimba.com/course/gflexbox)
- [Flexbox Froggy](https://flexboxfroggy.com)
- [FlexboxPatterns Excercises](https://www.flexboxpatterns.com)
- [Flex Cheatsheet](https://yoksel.github.io/flex-cheatsheet)

## CSS Grid

- [Scrimba](https://scrimba.com/course/gR8PTE)
- [Grid Garden](https://cssgridgarden.com/)
- [Grid Cheatsheet](https://yoksel.github.io/grid-cheatsheet)

## CSS Variables

- [Scrimba](https://scrimba.com/course/gcssvariables)

```css filename="index.css"
/* Declaration */

:root {
  --primary-color: #000000;
  --secondary-color: rgb(32, 173, 56);

  --primary-font-color: #ffffff;
  --secondary-font-color: #000000;

  --nav-bar-height: 3.8rem;
}

/* Usage */

body {
  color: var(--primary-font-color);
}

/* Variables can be overridden */
.dark-theme {
  color: white;
}

.navbar-item {
  height: var(--nav-bar-height);
  width: var(--nav-bar-height);
}
```

## UI Design Fundamentals

- [Scrimba](https://scrimba.com/course/gdesign)
- Refactoring UI - Book

## Responsive Design

- [Article](https://medium.com/better-programming/responsive-web-design-26e6f6213335)
- [freecodecamp YouTube video](https://www.youtube.com/watch?v=srvUrASNj0s)

### CSS Units

Absolute

- `px`

Percentages

- Relative to their parent (except on `height`)

Relative

- relative to font Size
  - `em`
    - relative to parent, if used on font-size
    - relative to "this" element, if used on other properties
    - if not declared anywhere uses html font-size (16px)
  - `rem`
    - relative to root (html) font-size
- relative to viewport
  - `vh`
  - `vw`

Usage

- for `font-size` : `rem`
- for `padding`, `margin` : `em`
- for `widths` : `em` or `%`

`min`/`max-width`, `height`

- use it to restrict
  - `max` for large screeens
  - `min` for small screens

### Media Queries

```css filename="library.css"
/* Option: 1 */
/* Use flex-direction column for smaller devices */
.articles {
  display: flex;
}

/* Mobile Styles */
/* Applied only if width <= 1000px */
@media screen and (max-width: 1000px) {
  .articles {
    flex-direction: column;
  }
}

/* Option: 2 */
/* Use different grid areas for different devices */

/* Desktop styles */
.library {
  display: grid;
  grid-template-areas: "sm c c";
  grid-template-columns: 1fr 1fr repeat(1, 1fr);
  grid-template-rows: 1fr;
  height: calc(100% - var(--nav-bar-height));
}

/* Mobile Styles */
/* Applied only if width <= 1000px */
@media screen and (max-width: 1000px) {
  .library {
    grid-template-areas: "c";
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
  }
}
```

## Animations

### Transition

```css
.heading {
  color: darkblue;
  transition: all 0.5s;
}
.heading:hover {
  color: aqua;
}
```

`transition: (property) (duration) (timing-funtion) (delay)`

- `transition-property: all`
- `transition-duration: (time in s)`
- `transition-timing-function: (variation)`
  - `linear` (default)
  - `ease`
  - `ease-in`
- `transition-delay: (time)`

Example: `transition: all 0.5s ease-in 0.5s`;

### Animation

- defined independently

  ```css
  @keyframes (animation_name) {
    /* from -> to */
     {
      from {
        width: 50px;
        height: 50px;
      }
      to {
        width: 50px;
        height: 50px;
      }
    }

    /* use percentages */
     {
      0% {
        width: 50px;
      }
      50% {
        width: 100px;
      }
      100% {
        width: 50px;
      }
    }
  }
  ```

:::note
:::
**NOTE:** Define ALL properties in each step in each step (even if they are same) to avoid confusion

- animation property

  ```css
  .box {
    animation: grow 1s ease 0.5s 5 alternate both;
  }
  ```

- `animation: (name) (duration) (timing-function) (delay) (iteration-count) (direction) (fill-mode)`
  - `animation-name`
  - `animation-duration`
  - `animation-timing-function`
    - `linear` (default)
    - `ease`
    - `ease-in`
  - `animation-delay` (delay after page load)
  - `animation-iteration-count`
    - `(number)`
    - `infinite`
  - `animation-direction`
    - `normal` (default)
    - `reverse`
    - `alternate`
    - `alternate-reverse`
  - `animation-fill-mode`
    - styles we want to apply to element after animation is complete
      - `forwards`
      - `backwards`
      - `both` (apply whatever styles are present at the end of animation)

### Transform

- example

  ```css
  .box {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes transform {
    100% {
      transform: scaleX(0.5) scaleY(0.5);
    }
  }
  ```

- `scale (x,y)`
  - increase/decrease size
- `translate (x,y)`
  - move
- `rotate (+/-90deg)`
- `skew`
  - rotating along an axis

### CSS prefixes

- used for broswer compatibility
- format: `-prefix-property: ...;`
- `-webkit-animation: custom`
- `-ms-animation: custom`
- `-mox-animation: custom`
- `-o-animation:custom`
