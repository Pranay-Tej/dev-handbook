---
id: angular
title: Angular
sidebar_label: Overview
---

## Courses

- [malcoded](https://malcoded.com/posts/?filter=angular)
- [Codevolution](https://www.youtube.com/playlist?list=PLC3y8-rFHvwhBRAgFinJR8KHIrCdTkZcZ)
- [Scrimba](https://scrimba.com/course/gyourfirstangularapp)

## Setup

### Linux

- Install Node
- Install angular-cli from npm ```npm install -g @angular/cli```
- Create project ```ng new test-project```
  - options
    - (skip dependencies installation) ```--skip-install```
    - to install dependencies ```npm install```
- Generate ```ng generate component test-component``` or ```ng g c test-component```
  - Example: ```ng g c components/home/nav```
  - VS Code extension Angular Files
- Serve application ```ng serve``` or ```ng serve --open --port 4201``` or ```ng s -o -p 4201```
- Build ```ng build``` or ```ng build --dev``` or ```ng build --prod```
  - Builds application in ```dist``` folder

## Overview

- [Folder Structure](angular-folder-structure)
- [Flow](angular-flow)
- [Modules](angular-modules)
- [Components](angular-components)
- [Services](angular-services)
  - Dependency Injection
- [Component Communication](angular-component-communication)
- [Routing](angular-routing)
- [Data Binding](angular-data-binding)
  - Interpolation
  - Property Binding
  - Event Binding
  - Two-Way Binding
- [Directives](angular-directives)
  - Structural
  - Attribute
- [HTTP](angular-http)
  - HttpClientModule
  - Http Caching
  - Tracking Progress
- RxJS
  - Observables
  - Subject
  - pipe
  - map
  - tap
- Pipe
  - async pipe
  - Custom Pipes
- NgRx
  - Store
  - Actions
  - Reducer
  - Selectors
  - Effects
- Dockerize
  - nginx
  - Dockerfile
  - docker-compose
- Form Handling
- Deployment
  - [Vercel](../../deployment/vercel)
  - [Heroku](../../deployment/heroku#angular)
- [Angular Material](angular-material)
