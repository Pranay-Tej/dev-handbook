---
id: react-props
title: Props
sidebar_label: Props
---

## Contents <!-- omit in toc -->

- [Definition](#definition)
- [Usage in Functional Components](#usage-in-functional-components)

## Definition

- props (Properties) is data that component receives from parent
- The component doesn't own the data and hence cannot be changed

## Usage in Functional Components

```jsx filename="Welcome.js"
import React from "react";

function Welcome() {
  return (
    <div>
      <Greeting user="user_001" />
    </div>
  );
}
```

- props is received as an object in the Greeting Component

```js
{
  user: "user_001";
}
```

- props object received as function argument

```jsx filename="Greeting.js"
import React from "react";

function Greeting(props) {
  // use 'user' property of 'props' object
  const user = props.user;

  // OR

  // use JavaScript destructuring
  const { user } = props;

  return (
    <div>
      <p>Welcome {user}!</p>
    </div>
  );
}
```

## Usage in Class-based Components

```jsx filename="Welcome.js"
import React from "react";

class Welcome extends React.Component {
  render() {
    return (
      <div>
        <Greeting user="user_001" />
      </div>
    );
  }
}
```

- React.Component class has props object as a property

```jsx filename="Greeting.js"
import React from "react";

class Greeting extends React.Component {
  render() {
    // use 'user' property of 'props' object
    const user = this.props.user;

    // OR

    // use JavaScript destructuring
    const { user } = this.props;

    return (
      <div>
        <p>Welcome {user}!</p>
      </div>
    );
  }
}
```

## Render Children

- To pass dynamic html content in components
- Use `{ props.children }` to render children in the DOM tree of component

```jsx filename="App.js"
function App() {
  return (
    <div>
      // self closing tag with no children
      <Greeting user="user_001" />
      <Greeting user="user_002">
        <p>User2 info</p>
      </Greeting>
      <Greeting user="user_003">
        <button>User 3 Button</button>
      </Greeting>
    </div>
  );
}
```

```jsx filename="Greeting.js"
import React from "react";

function Greeting(props) {
  // use 'user' property of 'props' object
  const user = props.user;

  // OR

  // use JavaScript destructuring
  const { user } = props;

  return (
    <div>
      <p>Welcome {user}!</p>
      // load whatever html is present as children
      {props.children}
    </div>
  );
}
```
