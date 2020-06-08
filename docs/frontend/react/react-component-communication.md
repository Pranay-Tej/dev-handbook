---
id: react-component-communication
title: Component Communication
sidebar_label: Component Communication
---

## Contents<!-- omit in toc -->

## Parent to Child

- Pass data from parent as ```props``` to children

```jsx title="Parent.js"
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

```jsx title="Child.js"
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

```jsx title="Parent.js"
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

```jsx title="Child.js"
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

## Sibling to Sibling through Parent

```jsx title="Parent.js"
function Parent() {
    const [sibling2_data, setSibling2_data] = useState("");

    const handleSibling2Change = data => {
        setSibling2_data(data);
    };

    return (
        <div>
            <p>Case C: Sibling Interaction through Parent</p>
            <h2>Parent</h2>
            <Sibling1 handleSibling2Change={handleSibling2Change} />
            <Sibling2 dataFromSibling1={sibling2_data} />
        </div>
    );
}
```

```jsx title="Sibling1.js"
function Sibling1(props) {
  const { handleSibling2Change } = props;

  const [sibling1_data, setSibling1_data] = useState("");

  const handleChange = event => {
    //   for reactive form
    setSibling1_data(event.target.value);
    handleSibling2Change(event.target.value);
  };
  return (
    <div>
      <h4>Sibling1</h4>
      <input type="text" value={sibling1_data} onChange={handleChange} />
    </div>
  );
}
```

```jsx title="Sibling2.js"
function Sibling2(props) {
  const { dataFromSibling1 } = props;

  const [sibling2_data, setSibling2_data] = useState("");

  useEffect(() => {
    setSibling2_data(dataFromSibling1);
  }, [dataFromSibling1]);

  return (
    <div>
      <h4>Sibling2</h4>
      <p>{`Sibling2 Data: ${sibling2_data}`}</p>
    </div>
  );
}
```

- Read ```useEffect()``` in [Life Cycle Methods](react-life-cycle)

## Without Parent-Child Interaction

- Source : [Medium Article](https://medium.com/@krzakmarek88/eventemitter-instead-of-lifting-state-up-f5f105054a5
)
- [npm package](https://www.npmjs.com/package/eventemitter3
)
- Install npm package &rarr; ```npm i eventemitter3```
- Create emitter.js in services

```jsx title="services/emitter.js"
import EventEmitter from 'eventemitter3'

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event, fn) => eventEmitter.on(event, fn),
  once: (event, fn) => eventEmitter.once(event, fn),
  off: (event, fn) => eventEmitter.off(event, fn),
  emit: (event, payload) => eventEmitter.emit(event, payload)
}

Object.freeze(Emitter);

export default Emitter;
```

```jsx title="Parent.js"
function ParentD() {
    return (
        <div>
            <p>Case D: Without parent-child interaction</p>
            <h2>Parent</h2>
            <ChildD1 />
            <ChildD2 />
        </div>
    )
}
```

- Emit data from Child1

```jsx title="Child1.js"
import Emitter from "/services/emitter";

function Child1() {
    const [child1_data, setChild1_data] = useState("");

    const handleChange = (event) => {
        setChild1_data(event.target.value);

        // emitting data on change
        Emitter.emit("dataFromChild1ToChild2", event.target.value);
    };

    return (
        <div>
            <h4>Child1</h4>
            <input type="text" value={child1_data} onChange={handleChange} />
        </div>
    );
}
```

- Subscribe for the event in Child2

```jsx title="Child2.js"
import Emitter from "/services/emitter";

function Child2() {
    const [childD2_data, setChildD2_data] = useState("");

    useEffect(() => {

        // subscribing
        Emitter.on('dataFromChild1ToChild2', (data) => {
            setChildD2_data(data);
        });

        return () => {
            // unsubscribing on unmount
            Emitter.off('dataFromChild1ToChild2')
        }
    }, []);

    return (
        <div>
            <h4>Child2</h4>
            <p>{`Child2 Data: ${childD2_data}`}</p>
        </div>
    );
}
```
