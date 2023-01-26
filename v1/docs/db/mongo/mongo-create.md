---
id: mongo-create
title: Create/Insert Documents
sidebar_label: Create
---

## ```insertOne()```

### Compass

- Click ```Insert Document``` button in Compass &rarr; Collection &rarr; Documents Tab
- Enter key value pairs
- Click ```Insert```

### Shell

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

## ```insertMany()```

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
