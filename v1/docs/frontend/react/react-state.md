---
id: react-state
title: State
sidebar_label: State
---

## Contents<!-- omit in toc -->

- [Definition](#definition)
- [Usage in Functional Components](#usage-in-functional-components)
  - [Defining State](#defining-state)
  - [Changing State](#changing-state)
- [Usage in Class-based Components](#usage-in-class-based-components)
  - [Changing State](#changing-state-1)
- [Changing State without using ```setState```](#changing-state-without-using-setstate)
- [```doSomething()``` after changing state](#dosomething-after-changing-state)
  - [Class-based Components](#class-based-components)
  - [Functional Components](#functional-components)
- [state change dependent on its previous value](#state-change-dependent-on-its-previous-value)

## Definition

- state is data that component owns or defines by itself
- The component owns the data and hence can be changed
- Similar to variables declared in TS files of angular components

## Usage in Functional Components

```jsx title="Welcome.js"
import React from 'react'

function Welcome(){
    return(
        <div>
            <Greeting />
        </div>
    )
}
```

### Defining State

```jsx title="Greeting.js"
import React, { useState } from 'react'

function Greeting(){

    // use 'useState' hook to define a state for component 
    const [message, setMessage] = useState('Welcome!');

    return(
        <div>
            <p>{ message }</p>
        </div>
    )
}
```

### Changing State

```jsx title="Greeting.js"
import React, { useState } from 'react'

function Greeting(){

    // use 'useState' hook to define a state for component
    const [message, setMessage] = useState('Welcome!');

    const capitalizeMessage = () => {
        const message_copy = message;
        setMessage(message_copy.toUpperCase());
    }

    return(
        <div>
            <p>{ message }</p>

            <button
                onClick = { capitalizeMessage }
            >
                Capitalize
            </button>
        </div>
    )
}
```

- Read about ```onClick``` in [Event Handling](react-event-handling)

## Usage in Class-based Components

- React.Component class has props object as a property

```jsx title="Greeting.js"
import React from 'react'

class Greeting extends React.Component{
    constructor() {
        super()
        this.state = {
            message: 'Welcome!'
        }
    }

    render(){

        // using 'message' property of 'state' object
        const message = this.state.message

        //OR

        // using JavaScript destructuring
        const { message } = this.state

        return(
            <div>
                <p>{ message }</p>
            </div>
        )
    }
}
```

### Changing State

```jsx title="Greeting.js"
...

capitalizeMessage() {
    const capitalized_message = this.state.message.toUpperCase();

    this.setState(
        {
            message : capitalized_message
        }
    )
}

...
```

Source : [Codevolution Youtube](https://youtu.be/uirRaVjRsf4?t=554)

## Changing State without using ```setState```

:::note
:::
**NOTE:**

- Changing state without using ```setState``` does NOT re-render the component.
- In the below code count increments are logged to console correctly but since component won't render, count is always shown as 0 in the browser view

```jsx title="Counter.js"
import React, { useState } from 'react';

const Counter = () => {
    const [count, setCount] = useState(0)

    const increase = () => {
        count = count + 1
        console.log(count)
    }

    return (
        <div>
            <p>{ count } </p>
            <button onClick = { increase }>Increase</button>
        </div>
    )
}

export default Counter
```

## ```doSomething()``` after changing state

:::note
:::
**NOTE:**

### Class-based Components

- To ```doSomething()``` after ```setState``` is called, use callback function as second parameter of ```setState```.
- In the below code when message is logged to the console it is not capitalized. This is because setState is called asynchronously and in this case will be called when user clicks capitalized button. But console log statement shows the value that was present before the change has occurred, as console log is not run in the asynchronous call to setState.

```jsx title="Greeting.js"
...

capitalizeMessage() {
    const capitalized_message = this.state.message.toUpperCase();

    this.setState(
        {
            message : capitalized_message
        }
    )

    // ! logs NON-capitalized message to console
    console.log(this.state.message)
}

...
```

```jsx title="Greeting.js"
...

capitalizeMessage() {
    const capitalized_message = this.state.message.toUpperCase();

    this.setState(
        {
            message : capitalized_message
        },
        () => {
            // callback function called whenever state changes
            console.log(this.state.message)
        }
    )

}

...
```

### Functional Components

- Use ```useEffect``` hook and look for changes in ```message``` state and act accordingly

- Read ```useEffect``` in Life Cycle Methods

## state change dependent on its previous value

:::note
:::
**NOTE:**

- Use ```prevState``` if state depends on previous values
- React groups state change functions for performance
- In the below case both ```incrementCount()``` functions are grouped and called together which results in count increasing by only +1 instead of +2

```jsx title="Counter.js"
import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const incrementCount = () => {
        setCount(count + 1);
        // setCount(prevCount => prevCount + 1);
    };

    const incrementCountTwice = () => {
        incrementCount();
        incrementCount();
    };

    return (
        <div>
            <p>{count} </p>
            <button onClick={ incrementCountTwice }>Increase</button>
        </div>
    );
}
```

- In ```setCount()``` method, use a function to which current count value is passed as argument

```jsx title="Counter.js"
...

const incrementCount = () => {
    setCount(
        (prevCount) => {
            return prevCount + 1
        }
    );
};

...
```
