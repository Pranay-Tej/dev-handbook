---
id: firebase
title: Firebase
sidebar_label: Overview
---

## Angular

- [Fireship YouTube video](https://www.youtube.com/watch?v=aICeVhu2mAE)
- Create empty firebase app in website
- Install ```firebase-tools``` from npm
- Login ```firebase login```
- Build project for production ```ng build --aot --prod```
- Initialize firebase app ```firebase init```
- Select ```Hosting```
- public directory: ```dist/[project_name]```
- Configure as single page app: ```y```

---

## React

- Create empty firebase app in website
- Install ```firebase-tools``` from npm
- Login ```firebase login```
- Build project for production ```npm run build```
- Initialize firebase app ```firebase init```
- Select ```Hosting```
- public directory: ```build```
- Configure as single page app: ```y```

---

## GitLab CI

### Get Firebase token

- ```npm install firebase-tools```
- ```firebase login: ci```
- Login to get TOKEN
- Add token as environment variable (FIREBASE_TOKEN) in GitLab CI

### Create firebase files

- Initialize firebase app ```firebase init```
- Select ```Hosting```
- public directory: ```build```
- Configure as single page app: ```y```

### ```.gitlab-ci.yml```

- [Medium Article](https://medium.com/@thucnc/firebase-auto-deployment-with-gitlab-ci-for-vuejs-project-5a2dd9b1edb7)
- [Medium Article](https://medium.com/evenbit/automatically-deploy-to-firebase-with-gitlab-ci-546f194c44d8)