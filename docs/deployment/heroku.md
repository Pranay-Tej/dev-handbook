---
id: heroku
title: Heroku
sidebar_label: Heroku
---

## Push part of a project

Git Subtree

```bash title="project_folder => backend/,  frontend/, .git/"
# example-backend is the name of heroku app
heroku git:remote --app example-backend
git remote rename heroku heroku-backend

git subtree split --prefix=backend/ -b backend-only
git push heroku-backend backend-only:master

# example-frontend is the name of heroku app
heroku git:remote --app example-frontend
git remote rename heroku heroku-frontend

git subtree split --prefix=frontend/ -b frontend-only
git push heroku-frontend frontend-only:master
```

## Spring Boot

- [Reference](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku)
- add `system.properties` to application root folder

    ```md title="system.properties"
    java.runtime.version=11
    ```

## Angular

- [Reference](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147)
- `ng build --aot --prod`
- `enhanced resolve` not necessary

## React

- install serve from npm

    ```bash title="project_folder"
    npm install serve
    ```

- change `scripts` in `package.json`

    ```js title="package.json"
    "scripts": {
        "dev": "react-scripts start",
        "start": "serve -s build",
        ...
    },
    ```

- now use
  - `npm run dev` for development mode
  - `npm run build` then `npm run start` for production mode
- add `engines` for consistent environment

    ```js title="package.json"
    "engines": {
        "node": "12.16.2",
        "npm": "6.14.4"
    }
    ```

- ```git push heroku master```
