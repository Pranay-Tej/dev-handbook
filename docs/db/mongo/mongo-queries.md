---
id: mongo-queries
title: Queries
sidebar_label: Queries
---

## Basics

- Every cluster consists of replicas
- Atlas free tier has 3 replicas
- If any one of them fails, other two still work ensuring reliability
- Every cluster consists of databases
- databases consist of collections
- collections consist of documents
- cluster &rarr; db &rarr; collections &rarr; documents
- documents are json like structures with key and value pairs
- Example:

```js
{
    "_id":{"$oid":"5ea08fc9c7c1073b80515d7e"},
    "name":"Theory",
    "username":"Kratos",
}
```

## Equality Query

- Returns all documents which have ```name = Kratos```

```bash
{ name : "Kratos" }
```

## Ranged Queries

- Returns all documents which have ```60 <= likes < 65```

```bash
{ likes : { $gte: 60 , $lt :65} }
```

### Operators

- Special keys with ```$``` sign are called as operators
- Examples: ```$gte```, ```$and```
