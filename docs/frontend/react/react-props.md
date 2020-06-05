---
id: react-props
title: Props
sidebar_label: Props
---

## Definition

- props (Properties) is data that component receives from parent
- The component doesn't own the data and hence cannot be changed

## Use in Functional Components

```js title="Welcome.js"
import React from 'react'

function Welcome(){
    return(
        <div>
            <Greeting user="user_001" />
        </div>
    )
}
```

- props is received as an object in the Greeting Component

```js
{
    user : 'user_001'
}
```

- props object received as function argument

```js title="Greeting.js"
import React from 'react'

function Greeting(props){

    // use 'user' property of 'props' object
    const user = props.user

    // OR use JavaScript destructuring
    const { user } = props

    return(
        <div>
            <p>Welcome {user}!</p>
        </div>
    )
}
```

## Use in Class-based Components

- React.Component class has props object as a property

```js title="Greeting.js"
import React from 'react'

class Greeting extends React.Component{

    render(){

        // use 'user' property of 'props' object
        const user = this.props.user

        // OR use JavaScript destructuring
        const { user } = this.props

        return (
            <div>
                <p>Welcome {user}!</p>
            </div>
        )
    }
}
```
