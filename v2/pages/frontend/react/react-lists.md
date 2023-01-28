---
id: react-lists
title: Lists
sidebar_label: Lists
---

## Render Simple List

```js filename="App.js"
export default function App() {
  const [item_list, setItem_list] = useState([
    {
      _id: "001",
      name: "Item001",
      description: "Item001 Description",
    },
    {
      _id: "002",
      name: "Item002",
      description: "Item002 Description",
    },
  ]);

  const item_list_jsx = item_list.map((item) => (
    <div>
      <p>{item.name}</p>
      <p>{item.description}</p>
    </div>
  ));

  return <div className="App">{item_list_jsx}</div>;
}
```

## Render lists in children

- `key` prop helps React handle changes in list
- DO NOT name `key` as prop to components as it is a reserved keyword for lists
- `key` MUST be unique
- Passing array index as `key` works ONLY for static lists

```js filename="App.js"
const item_list_jsx = item_list.map((item) => (
  <Item key={item._id} item={item} />
));
```

```js filename="Item.js"
export default function Item(props) {
  const { item } = props;

  return (
    <div>
      <p>{item.name}</p>
      <p>{item.description}</p>
    </div>
  );
}
```
