---
id: react-component-communication
title: Component Communication
sidebar_label: Component Communication
---

## Contents<!-- omit in toc -->

## Parent to Child

- Pass data from parent as ```props``` to children

```js title="Parent.js"
function Parent() {
    const [parent_data, setParent_data] = useState("");

    const handleChange = (event) => {
        setParent_data(event.target.value);
    };

    return (
        <div>
            <p>Case A: Parent to Child through props</p>
            <h2>Parent</h2>
            <input
                type="text"
                value={parent_data}
                onChange={handleChange}
            />
            <Child userInput={parent_data} />
        </div>
    );
}
```

- Read ```<input>``` in [Forms](react-forms)

```js title="Child.js"
function Child(props) {
    const { userInput } = props;

    return (
        <div>
            <h4>Child</h4>
            <p>{`child_data: ${userInput}`}</p>
        </div>
    );
}
```

:::note
:::

**NOTE:** Read JavaScript Template literals for ```{`childData: ${userInput}`}```

## Child to Parent

- Pass call back function from parent to child as props

```js title="Parent.js"
function Parent() {
    const [parent_data, setParent_data] = useState("");

    const handleParent_data = data => {
        setParent_data(data);
    };

    return (
    <div>
        <p>Case B: Child to parent through callback</p>
        <h2>Parent</h2>
        <p>{`parent_data: ${parent_data}`}</p>
        <Child handleParent_data={ handleParent_data } />
    </div>
    );
}
```

```js title="Child.js"
function Child(props) {
    const { handleParent_data } = props;
    // for reactive forms
    const [child_data, setChild_data] = useState("");

    const handleChange = event => {
        setChild_data(event.target.value);
        handleParent_data(event.target.value);
    };

    return (
        <div>
            <h4>Child</h4>

            <input
                type="text"
                value={ child_data }
                onChange={ handleChange }
            />
        </div>
    );
}
```

- Read Reactive Forms in [Forms](react-forms)