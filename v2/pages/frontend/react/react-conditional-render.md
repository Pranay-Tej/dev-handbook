---
id: react-conditional-render
title: Conditional Render
sidebar_label: Conditional Render
---

## Ternary operator

- `expression ? if_true : if_false`

```js filename="App.js"
export default function App() {
  const [count, setCount] = useState(1);

  return (
    <div className="App">
      <p>Count greater than zero: </p>
      {count > 0 ? (
        <div>
          <h1>Yes</h1>
          <p>True</p>
        </div>
      ) : (
        <h1>No</h1>
      )}
    </div>
  );
}
```

## `if else`

```js filename="App.js"
export default function App() {
  const [count, setCount] = useState(1);

  const renderElement = () => {
    if (count > 0) {
      return (
        <div>
          <h1>Yes</h1>
          <p>True</p>
        </div>
      );
    } else {
      return <h1>No</h1>;
    }
  };

  return (
    <div className="App">
      <p>Count greater than zero: </p>
      {renderElement()}
    </div>
  );
}
```

## Short-circuit operator - `&&`

- Render only if condition is `true`

```js filename="App.js"
export default function App() {
  const [count, setCount] = useState(1);

  return <div className="App">{count > 0 && <h1>{count}</h1>}</div>;
}
```
