---
id: strapi
title: Strapi
sidebar_label: Overview
---

## Courses

- [Traversy Media YouTube](https://www.youtube.com/watch?v=6FnwAbd2SDY)
- [Heroku, MongoDB Atlas Deploy Tutorial](https://www.youtube.com/watch?v=0PLoSxnxdVA)

## Setup

- Install Node: [Guide](../../languages/node/node)
- `npx create-strapi-app test-app`
- Set MongoDB Atlas configuration according to second video guide
- `npm run develop` Run app in development mode

:::note
:::
**NOTE:** Creation of Content types is only allowed in development mode

---

## Environment Variables

- [Official Strapi Guide](https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#environments)
- Create a `.env` file in root folder
- Move all environment variables from `config/database.js`, `config/server.js` & `extensions/users-permissions/config/jwt.js` to .env

```text title=.env
ADMIN_JWT_SECRET=abcd
JWT_SECRET=abcd
DATABASE_HOST=abcd
DATABASE_NAME=abcd
DATABASE_USERNAME=abcd
DATABASE_PASSWORD=abcd
```

---

## Deployment (Heroku CLI)

- Set environment variables in heroku
- Heroku CLI deployment guide: [Read](../../deployment/heroku#cli)

---

## Deployment (GitHub Actions)

- Deployment is same as any node app
- Heroku GitHub Actions Guide : [Read](../../deployment/heroku#github-actions-ci-cd)

---

## Workflow

- Create Collection in local `develop` mode
- Push code to source control
- Deploy to Cloud Hosting(Heroku)
- Add items to Collection from admin panel
- Give `READ` access to `public` in `Roles` for specific collection

:::note
:::
**NOTE:** Creation of Content types is not allowed in production mode

---

## Swagger Documentation

- [Official Docs Guide](https://strapi.io/documentation/developer-docs/latest/plugins/documentation.html)
- Install plugin `npm run strapi install documentation` in project root location
- Configure Production mode url for swagger documentation: [Guide](https://strapi.io/documentation/developer-docs/latest/plugins/documentation.html#settings)
- Create a file `./extensions/documentation/config/settings.json`

:::note
:::
**NOTE:** Any changes done full_documentation.json will rewrite everytime (volatile) a new model is generated or server is restarted. Only settings.json config is persistent.

```json title="/extensions/documentation/config/settings.json"
{
  "servers": [
    {
      "url": "http://localhost:1337",
      "description": "Development server"
    },
    {
      "url": "YOUR_STAGING_SERVER",
      "description": "Staging server"
    },
    {
      "url": "https://strapiatlas.herokuapp.com",
      "description": "Production server"
    }
  ]
}
```

- Restart Strapi app
- Login to admin panel
- Enable Restricted access to documentation by adding password
