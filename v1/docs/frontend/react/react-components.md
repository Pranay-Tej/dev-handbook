---
id: react-components
title: Components
sidebar_label: Components
---

## Definition

Components are building blocks of React app

## JSX

- JSX (JavaScript XML) is extension to JavaScript language syntax
- Enables HTML like code in components
- Is converted into pure JS in the background

### Switching between JSX and JavaScript

```js
<h1>Hello {`${firstName} ${lastName}`}!</h1>
<p>{ count }</p>
```

## Functional Components

```jsx title="index.js"
import React from "react"
import ReactDOM from "react-dom"


function Article(){
    return(
        <div>
            <Heading />
            <Content />
        </div>
    )
}

function Heading(){
    return(
        <h1>
            Article Heading...
        </h1>
    )
}

function Content(){
    return(
        <p>
            Article Content...
        </p>
    )

}

ReactDOM.render(
  <Article />
  ,
  document.getElementById("root")
)
```

### Separate Files for Components

```jsx title="Content.js"
import React from 'react'

function Content(){
    return(
        <div>
            <p>Content...</p>
        </div>
    )
}

export default Content
```

## Class-based Components

```jsx title="index.js"
import React from "react"
import ReactDOM from "react-dom"

class Article extends React.Component{
    render(){
        return(
            <div>
                <Heading />
                <Content />
            </div>
        )
    }
}


class Heading extends React.Component{
    render(){
        return(
            <h1>
                Article Heading...
            </h1>
        )
    }
}

class Content extends React.Component{
    render(){
        return(
            <p>
                Article Content...
            </p>
        )
    }
}

ReactDOM.render(
    <Article />,
    document.getElementById("root")
)

```
