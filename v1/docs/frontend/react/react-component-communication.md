---
id: react-component-communication
title: Component Communication
sidebar_label: Component Communication
---

## Contents<!-- omit in toc -->

- [Source](#source)
- [Parent to Child](#parent-to-child)
- [Child to Parent](#child-to-parent)
- [Sibling to Sibling through Parent](#sibling-to-sibling-through-parent)
- [Without Parent-Child Interaction](#without-parent-child-interaction)
  - [eventemitter3 package (Not recommended)](#eventemitter3-package-not-recommended)
  - [React Context API](#react-context-api)
  - [State Management Libraries](#state-management-libraries)
- [Zustand](#zustand)
- [react-redux](#react-redux)

## [Source](https://www.javascriptstuff.com/component-communication/)

## Parent to Child

- Pass data from parent as `props` to children

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
      <input type="text" value={parent_data} onChange={handleChange} />
      <Child userInput={parent_data} />
    </div>
  );
}
```

- Read `<input>` in Forms

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

**NOTE:** Read JavaScript Template literals for `` {`childData: ${userInput}`} ``

## Child to Parent

- Pass call back function from parent to child as props

```jsx title="Parent.js"
function Parent() {
  const [parent_data, setParent_data] = useState("");

  const handleParent_data = (data) => {
    setParent_data(data);
  };

  return (
    <div>
      <p>Case B: Child to parent through callback</p>
      <h2>Parent</h2>
      <p>{`parent_data: ${parent_data}`}</p>
      <Child handleParent_data={handleParent_data} />
    </div>
  );
}
```

```jsx title="Child.js"
function Child(props) {
  const { handleParent_data } = props;
  // for reactive forms
  const [child_data, setChild_data] = useState("");

  const handleChange = (event) => {
    setChild_data(event.target.value);
    handleParent_data(event.target.value);
  };

  return (
    <div>
      <h4>Child</h4>

      <input type="text" value={child_data} onChange={handleChange} />
    </div>
  );
}
```

- Read Reactive Forms in Forms

## Sibling to Sibling through Parent

```jsx title="Parent.js"
function Parent() {
  const [sibling2_data, setSibling2_data] = useState("");

  const handleSibling2Change = (data) => {
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

  const handleChange = (event) => {
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

- Read `useEffect()` in Life Cycle Methods

## Without Parent-Child Interaction

### eventemitter3 package (Not recommended)

- Source : [Medium Article](https://medium.com/@krzakmarek88/eventemitter-instead-of-lifting-state-up-f5f105054a5)
- [npm package](https://www.npmjs.com/package/eventemitter3)
- Install npm package &rarr; `npm i eventemitter3`
- Create emitter.js in services
- Register all events in Emitter to easily manage all events in a single centralized place
- Components should emit or subscribe to registered events only

```jsx title="services/emitter.js"
import EventEmitter from "eventemitter3";

const eventEmitter = new EventEmitter();

const Emitter = {
  on: (event, fn) => eventEmitter.on(event.id, fn),
  once: (event, fn) => eventEmitter.once(event.id, fn),
  off: (event, fn) => eventEmitter.off(event.id, fn),
  emit: (event, payload) => eventEmitter.emit(event.id, payload),
};

Object.freeze(Emitter);

//  centralized place for all events

const events = {
  dataFromChild1ToChild2: {
    id: "dataFromChild1ToChild2",
    info: "user input from Child1",
  },
  confirmationFromChild2: {
    id: "confirmationFromChild2",
    info: "confirmation from Child1",
  },
};

Object.freeze(events);

export { events, Emitter };
```

```jsx title="Parent.js"
function Parent() {
  return (
    <div>
      <p>Case D: Without parent-child interaction</p>
      <h2>Parent</h2>
      <ChildD1 />
      <ChildD2 />
    </div>
  );
}
```

- Emit event and data from Child1

```jsx title="Child1.js"
import { Emitter, events } from "../../../services/emitter";

function Child1() {
  const [child1_data, setChild1_data] = useState("");

  useEffect(() => {
    // subscribing
    Emitter.on(events.confirmationFromChild2, () =>
      console.log("Confirmation received")
    );

    return () => {
      // unsubscribing on unmount
      Emitter.off(events.confirmationFromChild2);
    };
  }, []);

  const handleChange = (event) => {
    setChild1_data(event.target.value);

    // emitting data on change
    Emitter.emit(events.dataFromChild1ToChild2, event.target.value);
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
import { Emitter, events } from "../../../services/emitter";

function Child2() {
  const [childD2_data, setChildD2_data] = useState("");

  useEffect(() => {
    // subscribing
    Emitter.on(events.dataFromChild1ToChild2, (data) => {
      setChildD2_data(data);
      Emitter.emit(events.confirmationFromChild2);
    });

    return () => {
      // unsubscribing on unmount
      Emitter.off(events.dataFromChild1ToChild2);
    };
  }, []);

  return (
    <div>
      <h4>Child2</h4>
      <p>{`Child2 Data: ${childD2_data}`}</p>
    </div>
  );
}
```

---

### React Context API

---

### State Management Libraries

## Zustand

## react-redux
