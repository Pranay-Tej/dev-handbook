---
id: react-components
title: Components
sidebar_label: Components
---

## Definition

Components are building blocks of React app

## JSX

- JSX (JavaScript XML) is extenstion to JavaScript language syntax
- Enables HTML like code in components
- Is converted into pure JS in the background

## Functional Components

```js title="index.js"
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

## Class-based Components

```js title="index.js"
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
