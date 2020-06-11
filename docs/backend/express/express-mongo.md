---
id: express-mongo
title: Working with MongoDB
sidebar_label: Working with MongoDB
---

## Connecting to Database

- Install mongoose ```npm i mongoose```

```js title="app.js"
const MONGO_URI = "mongodb://localhost:27017/express-demo"

mongoose.connect(
    MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);
```

## Defining Schema

- Create folder ```models/```
- Create file ```Article.js```

```js title="Article.js"
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Article", ArticleSchema);
```

### Save data to database

- To deal with json and forms add middleware to app.js
  
```js title="app.js"
app.use(express.json())

app.use(express.urlencoded({ extended: false }));
```

- Add post request route to ```routes/article.js```
- Use ```res.json()``` to return a json

```js title="article.js"
router.post("/", (req, res) => {
    const article = new Article(req.body);
    article.save()
        .then(data => {
            res.json(data)
        }).catch(err => {
            res.status(404).json({message: err})
        })
});
```

- OR use JavaScript ```async await```

```js title="article.js"
router.post("/", async (req, res) => {
    const article = new Article(req.body);

    try {
        const savedArticle = await article.save();
        res.json(savedArticle);
    } catch (err){
        res.status(404).json({ message: err });
    }
});
```

## Get data from database

### All

```js title="article.js"
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (err){
        res.status(404).json({ message: err });
    }
});
```

### Specific

```js title="article.js"
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            throw "Article not found!";
        }
        res.json(article);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
```

## Update data

```js title="article.js"
router.put("/:id", async (req, res) => {
    try {
        const updatedArticle = await Article.updateOne(
            { _id: req.params.id },
            { $set: req.body }
        );

        if (updatedArticle.n == 0) {
            throw "Article not found!";
        }
        const article = await Article.findById(req.params.id)
        res.json(article);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
```

## Delete data

```js title="article.js"
router.delete("/:id", async (req, res) => {
    try {
        const removedArticle = await Article.deleteOne({ _id: req.params.id });
        if (removedArticle.deletedCount == 0) {
            throw "Article not found!";
        }
        res.json(removedArticle);
    } catch (err) {
        res.status(404).json({ message: err });
    }
});
```
