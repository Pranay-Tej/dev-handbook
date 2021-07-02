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

- Install Node: [Guide](../../languages/node/node)
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
  - Router Module
  - Path Variables
  - Query Params
  - Lazy Loading
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
- [Pipes](angular-pipes)
  - json pipe
  - async pipe
  - Custom Pipes
- [JWT Authentication](angular-jwt-auth)
  - HTTP Interceptor
  - Auth Guard
  - Router Module
  - Auth Service
  - Login Component
- [NgRx](angular-ngrx)
  - Store
  - Actions
  - Reducer
  - Selectors
  - Effects
- Dockerize
  - nginx
  - Dockerfile
  - docker-compose
- [Form Handling](angular-form-handling)
  - Template Driven
  - Reactive
    - FormControl
    - FormGroup
    - FormArray
    - FormBuilder
  - Validation
- Deployment
  - [Vercel](../../deployment/vercel)
  - [Heroku](../../deployment/heroku#angular)
- [Angular Material](angular-material)
