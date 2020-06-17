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

- Short version

```bash
vercel [frontend_folder_location] -c -n [vercel_project_name] -t TOKEN
```

- Example

```bash
vercel [frontend/react-ui/user-ui/] -c -n [react-example] -t TOKEN
```
