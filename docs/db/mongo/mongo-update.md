---
id: mongo-update
title: Update
sidebar_label: Update
---

## Flexibility

- In MongoDB documents in a single collection can have different schemas
- Example: If a ```game``` does not have a ```poster``` field it may be excluded from the document completely. Other ```game```s in the collection may have it

## ```updateOne()```

- ```updateOne()``` takes filter as first argument, object with ```$set``` operator as second argument
- ```$set``` operator takes a document as argument which has one or more fields listed

```bash
updateOne(
    { filter }, {
        $set: {
            field: value
        }
    }
)
```

- filter may return multiple documents, but ```updateOne()``` updates the first result

```bash
updateOne(
    { title: "Uncharted" }, {
        $set: {
            poster: "https://example-posters.com/jIukjs901X891"
        }
    }
)
```

- If the document already has a poster field it is updated to new value
- If the document does not have a poster field, it is added
- Multiple fields can be updated at once

```bash
updateOne(
    { title: "Uncharted" }, {
        $set: {
            rating: 10,
            awards: {
                wins: 5,
                nominations: 10
            }
        }
    }
)
```

---

## Update Operators

- [Documentation](https://docs.mongodb.com/manual/reference/operator/update/)

### ```$set```

- ```$set``` operator adds or replaces fields specified

### ```$inc```

- ```$inc``` increases the value by a specified amount

```js title="Before update"
{
    title: "Uncharted",
    ign: {
        userReviews: 30,
        editorReviews: 1
    }
}
```

```bash
updateOne(
    { title: "Uncharted" }, {
        $inc: {
            "ign.userReviews": 40,
            "ign.editorReviews": 2
        }
    }
)
```

```js title="After update"
{
    title: "Uncharted",
    ign: {
        userReviews: 70,
        editorReviews: 3
    }
}
```

---

## Array Update Operators

### ```$push```

```js title="Before update"
{
    title: "Uncharted",
    reviews: [
        {
            rating: 10,
            reviewer: "ign"
        }
    ]
}
```

```bash
updateOne(
    { title: "Uncharted" }, {
        $push: {
            reviews: {
                rating: 9.8,
                reviewer: "gamespot"
            }
        }
    }
)
```

```js title="After update"
{
    title: "Uncharted",
    reviews: [
        {
            rating: 10,
            reviewer: "ign"
        },
        {
            rating: 9.8,
            reviewer: "gamespot"
        }
    ]
}
```

---

## Modifiers

### ```$each```

- Modifies $push to append multiple items to array

```bash
updateOne(
    { title: "Uncharted" }, {
        $push: {
            reviews: {
                $each: [
                    {
                        rating: 9.8,
                        reviewer: "gamespot"
                    },
                    {
                        rating: 10,
                        reviewer: "metacritic"
                    }
                ]
            }
        }
    }
)
```

:::note
:::
**NOTE:** If $each is not used in this case, entire reviews will be replaced by the array specified and the already existing elements will be erased

## ```$sort```

- Modifies the $push to reorder documents in array

```bash
updateOne(
    { title: "Uncharted" }, {
        $push: {
            reviews: {
                $each: [
                    {
                        rating: 9.8,
                        reviewer: "gamespot"
                    },
                    {
                        rating: 10,
                        reviewer: "metacritic"
                    }
                ],
                $sort: { rating: 1 }
            }
        }
    }
)
```

---

## ```updateMany()```

- Same as ```updateOne()```. But instead updating the first resulting document, ```updateMany()``` updates all resulting documents
