---
id: react-event-handling
title: Event Handling
sidebar_label: Event Handling
---

## Click handling

```jsx filename="Hello.js"
import React from "react";

export default function Hello() {
  const sayHello = () => {
    console.log("Hello");
  };

  return <button onClick={sayHello}>Click Me!</button>;
}
```

---

## EventHandler vs Calling a function

- Source: [Codevolution](https://www.youtube.com/watch?v=Znqv84xi8Vs&feature=youtu.be&t=184)
- EventHandler takes a function, NOT a function call

```js filename="Hello.js"
// WRONG Approach
<button onClick={sayHello()}>Click Me!</button>;

// CORRECT Approach
<button onClick={sayHello}>Click Me!</button>;
```

- (WRONG Approach) In first case `sayHello` method is called on page load and will NOT be called on click events
- (CORRECT Approach) In second case `sayHello` is triggered when a click event occurs on the button
