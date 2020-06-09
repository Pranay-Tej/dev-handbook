---
id: express-requests
title: Requests
sidebar_label: Requests
---

## GET requests

- Return status code with res.status(status_code).send(message_string)
- Example: Return 404 ERROR for articles greater than 10

```js title="articles.js"
router.get('/:id', (req, res) => {
    if(req.params.id > 10){
        res.status(404).send('Article not found!')
    }
    res.send(req.params.id)
})
```

## POST requests

- Package for Schema validation ```npm i @hapi/joi```
- Validate request body before proceeding with post request
