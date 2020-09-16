---
id: heroku
title: Heroku
sidebar_label: Overview
---

## Deal with app load time

- Heroku free tier apps sleep after 30 minutes of inactivity
- Create an endpoint to use for waking the backend
- Add a loading screen to frontend and call the ```/wakeup``` endpoint
- Load app home page after receiving response from endpoint

---

## Push part of a project

### Git Subtree

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

---

## GitLab CI

- [Article](https://medium.com/swlh/how-do-i-deploy-my-code-to-heroku-using-gitlab-ci-cd-6a232b6be2e4)
- Add Tokens in GitLab CI Environment Variables
- Reference

```bash title=".gitlab-ci.yml"
api-deploy:
  stage: deploy
  variables:
    HEROKU_APP_NAME: "api-production"
    HEROKU_API_KEY: "THIS-IS-AN-EXAMPLE"
    HEROKU_APP_GIT_REMOTE_NAME: "api-production"
    DESIRED_BRANCH_TO_DEPLOY: "$CI_COMMIT_REF_NAME"
  image: python:3.7
  script:
    # Assumes you start in `/builds/project-0/`
    # Install heroku CLI
    - curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
    # Configure Heroku CLI
    - heroku git:remote --app $HEROKU_APP_NAME
    - git remote rename heroku $HEROKU_APP_GIT_REMOTE_NAME
    - heroku stack:set container --app $HEROKU_APP_NAME
    - git checkout $DESIRED_BRANCH_TO_DEPLOY
    # Sets authentication with git for Heroku
    - echo -e "machine git.heroku.com\n  login gitlab_ci_cd@example.com\n  password $HEROKU_API_KEY" >> ~/.netrc
    - cat ~/.netrc
    # Deploy
    - git push --force $HEROKU_APP_GIT_REMOTE_NAME $DESIRED_BRANCH_TO_DEPLOY:master
```

- Practical

```bash title=".gitlab-ci.yml"
image: ubuntu:18.04

before_script:
  - apt-get update -qy && apt-get install --no-install-recommends
  - apt-get install -qy git
  - git config user.email $EMAIL_ID
  - git config user.name $GIT_USERNAME
  # - apt-get install -qy snapd
  # - snap install --classic heroku
  - apt-get install -qy curl
  - curl https://cli-assets.heroku.com/install.sh | sh
  - echo -e "machine git.heroku.com\n  login $EMAIL_ID\n  password $HEROKU_API_KEY" >> ~/.netrc
#   - cat ~/.netrc

stages:
#   - test
#   - package
  - deploy-backend
  - deploy-frontend
  - deploy-react-ui

  # api-deploy:
  #   stage: deploy
  #   variables:
  #     HEROKU_APP_NAME: "api-production"
  #     HEROKU_API_KEY: "THIS-IS-AN-EXAMPLE"
  #     HEROKU_APP_GIT_REMOTE_NAME: "api-production"
  #     DESIRED_BRANCH_TO_DEPLOY: "$CI_COMMIT_REF_NAME"
  #   image: python:3.7
  #   script:
  #     # Assumes you start in `/builds/project-0/`
  #     # Install heroku CLI
  #     - curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
  #     # Configure Heroku CLI
  #     - heroku git:remote --app $HEROKU_APP_NAME
  #     - git remote rename heroku $HEROKU_APP_GIT_REMOTE_NAME
  #     - heroku stack:set container --app $HEROKU_APP_NAME
  #     - git checkout $DESIRED_BRANCH_TO_DEPLOY
  #     # Sets authentication with git for Heroku
  #     - echo -e "machine git.heroku.com\n  login gitlab_ci_cd@example.com\n  password $HEROKU_API_KEY" >> ~/.netrc
  #     - cat ~/.netrc
  #     # Deploy
  #     - git push --force $HEROKU_APP_GIT_REMOTE_NAME $DESIRED_BRANCH_TO_DEPLOY:master


# cache:
#   paths:
#     - .m2/
# variables:
#   MAVEN_OPTS: "-Dmaven.repo.local=/cache"


# maven_test:
#   image: maven:3-jdk-11
#   stage: test
#   tags:
#     - immersive-runner-cgi
#   script:
#     - mvn clean testdev
#   script:
#     - mvn clean package

heroku_deploy-backend:
  stage: deploy-backend
  # tags:
  #   - heroku-deploy-backend
  script:
    - heroku git:remote --app $HEROKU_APP_BACKEND
    - git remote rename heroku heroku-backend
    - heroku stack:set heroku-18 --app $HEROKU_APP_BACKEND
    # heroku stack:set heroku-18
    # - git remote add heroku-backend https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_BACKEND.git
    - git subtree split --prefix=gist-service/ -b backend-only
    - git push -f heroku-backend backend-only:master
  only:
    - master

heroku_deploy-frontend:
  stage: deploy-frontend
  # tags:
  #   - heroku-deploy-frontend
  script:
    - heroku git:remote --app $HEROKU_APP_FRONTEND
    - git remote rename heroku heroku-frontend
    - heroku stack:set heroku-18 --app $HEROKU_APP_FRONTEND
    # - git remote add heroku-frontend https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_FRONTEND.git
    - git subtree split --prefix=angular-ui/snippet-ui/ -b frontend-only
    - git push -f heroku-frontend frontend-only:master
  only:
    - master

heroku_deploy-react-ui:
  stage: deploy-react-ui
  script:
    - heroku git:remote --app $HEROKU_APP_REACT_UI
    - git remote rename heroku heroku-react-ui
    - heroku stack:set heroku-18 --app $HEROKU_APP_REACT_UI
    # - git remote add heroku-frontend https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP_FRONTEND.git
    - git subtree split --prefix=react-ui/user-ui/ -b react-ui-only
    - git push -f heroku-react-ui react-ui-only:master
  only:
    - master
```

---

## Spring Boot

- [Reference](https://devcenter.heroku.com/articles/deploying-spring-boot-apps-to-heroku)
- add `system.properties` to application root folder

    ```md title="system.properties"
    java.runtime.version=11
    ```

---

## Angular

### Using serve

- Install serve from npm

```bash title="project_folder"
npm install serve
```

- Change `scripts` in `package.json`

```js title="package.json"
"scripts": {
    "dev": "ng serve",
    "start": "serve -s dist/project_name",
    "heroku-postbuild": "ng build --aot --prod"
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

- ```git push heroku master``` to push to heroku

### Using Express server

- [Reference](https://itnext.io/how-to-deploy-angular-application-to-heroku-1d56e09c5147)
- `ng build --aot --prod`
- `enhanced resolve` not necessary


---

## React

- Install serve from npm

```bash title="project_folder"
npm install serve
```

- Change `scripts` in `package.json`

```js title="package.json"
"scripts": {
    "dev": "react-scripts start",
    "start": "serve -s build",
},
```

- Now use
  - `npm run dev` for development mode
  - `npm run build` then `npm run start` for production mode
- add `engines` for consistent environment

```js title="package.json"
"engines": {
    "node": "12.16.2",
    "npm": "6.14.4"
}
```

- ```git push heroku master``` to push to heroku

---

## Express

- Add Environment variables in heroku website app settings
- ```git push heroku master```
