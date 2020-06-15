---
id: mongo-queries
title: Queries
sidebar_label: Queries
---

## Contents <!-- omit in toc -->

- [Create/Insert Document](#createinsert-document)
  - [```insertOne()```](#insertone)
  - [```insertMany()```](#insertmany)
- [Read](#read)
  - [```find()```](#find)
  - [Embedded/Nested documents](#embeddednested-documents)
  - [Array Fields](#array-fields)
    - [Exact match](#exact-match)
    - [Filter for single element](#filter-for-single-element)
    - [Filter along with position/index](#filter-along-with-positionindex)
- [Cursors](#cursors)
- [Projections](#projections)
  - [Include only specific fields](#include-only-specific-fields)

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

:::note
:::
**NOTE:** Use ```pretty()``` to view results in json format. Example: ```db.collection_name.find(equality_filter).pretty()```

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

### Array Fields

```js
{
    title: "The Last of Us",
    platform: "PS4",
    cast: ["Troy Baker", "Ashley Johnson", "Nolan North" ]
}
```

#### Exact match

- Pass array in selector to find the documents which have EXACT match in elements AND their order

```bash
db.games.find({ cast: ["Troy Baker", "Ashley Johnson"] })
```

- Returns documents which have ```cast = ["Troy Baker", "Ashley Johnson"]```

#### Filter for single element

- Find value in selector to find documents which have the passed filter in the array

```bash
db.games.find({ cast: "Troy Baker" })
```

- Returns documents which have the "Troy Baker" as one of the cast members. There may be other members as well in the array

#### Filter along with position/index

```bash
db.games.find({ "cast.0": "Troy Baker" })
```

- Returns documents in which "Troy Baker" is the FIRST element in cast array

---

## Cursors

- By default mongodb shell returns a cursor for a query which contains 20 documents
- To view the next documents in:
  - Compass: Click next button for next 20 documents
  - Shell: Type ```it``` to iterate through next 20 documents

---

## Projections

Projections are objects passed  as second argument to the ```find()``` function to LIMIT the fields in the fetched documents

### Include only specific fields

```bash
db.games.find({ platform: "PS4" }, { title: 1 })
```

- Returns ONLY ```_id & title``` fields in the resultant documents

```bash title="Output"
{
    "_id" : ObjectId("5ee3ac9e8596ceb79d3fd7f9"),
    "title" : "God of War",
}
{
    "_id" : ObjectId("5ee3ac9e8596ceb79d3fd7fc"),
    "title" : "The Last of Us",
}
```

### Exclude only specific fields

```bash
db.games.find({ platform: "PS4" }, { _id: 0, cast: 0 })
```

- Returns ALL BUT ```_id & cast``` fields in the resultant documents

```bash title="Output"
{
    "title" : "God of War",
    platform: "PS4",
}
{
    "title" : "The Last of Us",
    platform: "PS4",
}
```

### Combine

```bash
db.games.find({ platform: "PS4" }, { title: 1, _id: 0 })
```

- Returns ONLY ```title``` field in the resultant documents

```bash title="Output"
{
    "title" : "God of War"
}
{
    "title" : "The Last of Us"
}
```