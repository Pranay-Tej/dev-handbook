---
id: react-styling
title: Styling
sidebar_label: Styling
---

## Regular CSS

- Create a css file

```css title="styles.css"
.primary{
  background-color: red;
}
```

- Import css file into component file
- Use `className` property to add styles

```js title="Test.js"
import "./styles.css";

<div className="primary">
  Primary text
</div>
```

### Multiple styles

```css title="styles.css"
.primary{
  background-color: red;
}

.large{
  font-size: 24px;
}
```

```js title="Test.js"
import "./styles.css";

<div className="primary large">
  Primary text
</div>
```

### Conditional styling

- `large` class is applied only if `isHeading` props received is `true`
- Use Template literals for multiple classes

```js title="Test.js"
import "./styles.css";

export default function Test(props) {
  const { isHeading } = props;

  const size = isHeading ? 'large' : '';

  return (
    <div className={`primary ${size}`}>
      Primary text
    </div>
  );
}
```

---

## Inline Styling

- Use json
- Assign json to `style` property

```js title="Test.js"
export default function Test() {

  const primary-large = {
    color: 'red',
    fontSize: '24px'
  }

  return (
    <div style={ primary-large }>
      Primary Text
    </div>
  );
}

```

---

## CSS Modules

:::note
:::
**NOTE:** CSS Module styles are local to the component importing the module. Other components cannot use those styles without importing.

- Create file with name convention: `filename.module.css`
- Write styles like a normal css files

```css title="test.module.css"
.primary{
  color: red;
}

.large{
  font-size: 24px;
}
```

- Import css module into component js file
- Assign styles to `className` property
- For multiple classes use template literals
- Styles can be accessed two ways
  - `className={ styles.primary }`
  - `className={ styles["primary"] }`

:::note
:::
**NOTE:** First case will result in error for styles with `-` in class name

- `styles.primary-text` will result in ERROR.
- Use `styles["primary-text"]` to avoid errors.

```js title="Test.js"
import styles from "./app.module.css";

export default function Test() {
  return (
    <div className={ `${ styles["primary"] } ${ styles["large"] }` }>
      Primary Text
    </div>
  );
}

```

---

## Styled Components (CSS in JS)

- npm styled-components
