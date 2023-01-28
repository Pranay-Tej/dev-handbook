---
id: mongo-delete
title: Delete
sidebar_label: Delete
---

## ```deleteOne()```

- Syntax - ```deleteOne(filter)```
- Deletes the first document matching the filter

```bash
db.games.deleteOne({ _id: 30  })
```

## ```deleteMany()```

- Same as ```deleteOne()```, but deletes ALL documents matching the filter

```bash
db.games.deleteMany({ platform: "Orion"  })
```