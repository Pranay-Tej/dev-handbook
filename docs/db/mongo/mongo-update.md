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

## Update Operators

