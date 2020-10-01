---
id: vercel
title: Vercel (Zeit)
sidebar_label: Overview
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

## GitHub Actions (CI CD)

- Create a file `.github/workflows/vercel.yml` in root directory
- Get vercel API key from account &rarr; tokens
- Add GitHub Secrets in repository settings &rarr; secrets

```yml title="vercel.yml"
name: Deploy Vercel

on:
  push:
    branches:
      - master

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2.1.2
        with:
          node-version: '12'
      - run: npx vercel ts-test/ --confirm --name=gitub-actions-trail --token=${{secrets.VERCEL_TOKEN}} --prod
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
