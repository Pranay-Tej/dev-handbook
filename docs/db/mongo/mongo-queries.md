---
id: mongo-queries
title: Queries
sidebar_label: Queries
---

## Create/Insert Document

### ```insertOne()```

Compass

- Click ```Insert Document``` button in Compass &rarr; Collection &rarr; Documents Tab
- Enter key value pairs
- Click ```Insert```

Shell

- Use ```db.collection_name.insertOne(document_json)```

```bash
mongo

show dbs

use db_name

show collections

db.collection_name.insertOne({ title: "God of War", platform: "PS4", rating: 10})
```

:::note
:::
**NOTE:** ```_id``` field is inserted automatically by MongoDB. By default it is of type ```ObjectID```.

**TIP:** Use _id of single type for a given collection

### ```insertMany()```

- Use ```db.collection_name.insertMany(array_of_document_jsons)```

```bash
db.collection_name.insertMany(
    [
        { title: "God of War", platform: "PS4", rating: 10},
        { title: "The Last of Us", platform: "PS4", rating: 10}
    ]
)
```

- Will raise ERROR if two of the documents have same ```_id``` value and stops inserting at ERROR document location
- Pass ```options``` as second argument

```bash
db.collection_name.insertMany(
    [
        { title: "God of War", platform: "PS4", rating: 10},
        { title: "The Last of Us", platform: "PS4", rating: 10}
    ],
    {
        "ordered": false
    }
)
```

- Now all other documents are inserted except for the ones which result in ERRORs

---

## Read

### ```find()```

Single Selector

- Use ```find(equality_filter)``` to find documents

```bash
db.games.find({ platform: "PS4" })
```

- Returns documents with platform type PS4

Multiple selectors

```bash
db.games.find({ platform: "PS4", year: 2018 })
```

- Returns documents with platform type PS4 ```and``` released in year 2009

:::note
:::
**NOTE:** By default multiple selectors are filtered by ```AND``` logic

### Embedded/Nested documents

```js
{
    title: "God of War",
    platform: "PS4",
    ratings: {
        ign: 10,
        gamespot: 9.8,
        metacritic: 99,
    }
}
```

- Use dot-notation to filter with embedded/nested document fields

```bash
db.games.find({ "ratings.ign": 10 })
```

- Returns documents which were rated 10 by ign

:::note
:::
**NOTE:** Nesting can be done for multiple levels. ```{ wind.direction.angle: 290 }```

:::note
:::
**NOTE:** When running nested filters in shell key should be enclosed in quotes ```{ "wind.direction.angle": 290 }```

:::note
:::
**TIP:** Use ```.count()``` to find number of filter documents. Example: ```db.collection_name.find(equality_filter).count()```