---
id: vercel
title: Vercel (Zeit)
sidebar_label: Vercel
---

## Host Front-end apps

- Angular
- React
- Vue
- Static sites

Vercel Conditions

- [Usage Policy](https://vercel.com/docs/v2/platform/fair-use-policy)
- [Limits](https://vercel.com/docs/v2/platform/limits)

## Git

- Create account
- Connect Git repository from GitHub, GitLab or BitBucket

## CLI

- Install npm
- Install Vercel CLI ```npm i -g vercel```
- If the project is a standalone frontend app
- Run commands from root folder

```bash
vercel
```

- To use default settings

```bash
vercel --confirm
```

- If the project contains both frontend and backend

```bash
vercel [frontend_folder_location] --confirm
```

- To customize vercel project name

```bash
vercel [frontend_folder_location] --confirm --name=[vercel_project_name]
```

- To push with Auth Token
  - Vercel site &rarr; Dashboard &rarr; Settings &rarr; Tokens &rarr; Create

```bash
vercel [frontend_folder_location] -c -n [vercel_project_name] --token=TOKEN
```

- For production mode

```bash
vercel [frontend_folder_location] -c -n [vercel_project_name] --token=TOKEN --prod
```

- Short version

```bash
vercel [frontend_folder_location] -c -n [vercel_project_name] -t TOKEN --prod
```

- Example

```bash
vercel [frontend/react-ui/user-ui/] -c -n [react-example] -t TOKEN --prod
```

---

## Angular

- Change ```build``` script to production mode in ```package.json```

```js
"build": "ng build --aot --prod"
```

---

## GitLab CI

- Add Vercel Token in GitLab CI Environment Variables

```bash
image: node

before_script:
  - npm i -g vercel

stages:
  - deploy-frontend

vercel_deploy-react-ui:
  stage: deploy-frontend
  script:
    - vercel react-ui/user-ui/ --confirm --name=react-deploy-test --token=$ZEIT_TOKEN --prod
  only:
    - master
```
