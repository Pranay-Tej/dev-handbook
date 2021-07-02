---
id: vue
title: Vue 3
sidebar_label: Overview
---

## Courses

- <a href="https://www.youtube.com/playlist?list=PLC3y8-rFHvwgeQIfSDtEGVvvSEPDkL_1f" _target="blank">Codevolution Vue 3</a>
- <a href="https://v3.vuejs.org/" _target="blank">Vue 3 official docs</a>
- FrontendMasters Courses
  - Intro to Vue
    - <a href="https://frontendmasters.com/courses/vue-3" _target="blank">Course</a>
    - <a href="https://github.com/sdras/intro-to-vue" _target="blank">GitHub Repo</a>
    - <a href="https://github.com/sdras/intro-to-vue#slides" _target="blank">Slides</a>
  - Building Applications with Vue & Nuxt
    - <a href="https://frontendmasters.com/courses/vue-nuxt-apps" _target="blank">Course</a>
    - <a href="https://github.com/sdras/building-web-apps-with-vue" _target="blank">GitHub Repo</a>
    - <a href="https://github.com/sdras/building-web-apps-with-vue#slides" _target="blank">Slides</a>
  - Production Grade Vue
    - <a href="https://frontendmasters.com/courses/production-vue" _target="blank">Course</a>
    - <a href="https://github.com/bencodezen/production-grade-vue" _target="blank">GitHub Repo</a>
    - <a href="https://production-grade-vue.bencodezen.io" _target="blank">Course Documentation</a>
  - Vuex for Intermediate Vue.js Developers
    - <a href="https://frontendmasters.com/courses/vuex" _target="blank">Course</a>
    - <a href="https://github.com/shortdiv/frontend-masters-vuex" _target="blank">GitHub Repo</a>
    - <a href="https://github.com/shortdiv/frontend-masters-vuex#slides" _target="blank">Slides</a>

:::note
:::
**NOTE:** FrontendMasters provides access to course partially even without a paid account. Most of the courses host the course code and slides publicly on GitHub.

**TIP:** Course code and slide links are visible in FrontendMasters Mobile app

---

## Ecosystem

- Vue CLI
- Vite (development server)
  - <a href="https://wildermuth.com/2021/01/10/Vite-for-Existing-Vue-CLI-Projects" _target="blank">Add vite to Vue CLI project for dev server</a>
- Routing
  - Vue Router
- UI Components
  - Vuetify
- State management
  - Vuex
- Forms
  - Vuelidate
  - Vee Validate
- Composition utilities (hooks)
  - VueUse

## Resources

- <a href="https://www.youtube.com/channel/UCgmcPHueYRarnCkihtNIRlw" _target="blank">Learn Vue Youtube</a>
- <a href="https://vue-community.org" _target="blank">Vue Community Guide (Learning & Ecosystem)</a>
- <a href="https://github.com/vuejs/awesome-vue" _target="blank">Awesome Vue (Colleciton of Vue resources)</a>
- <a href="https://madewithvuejs.com" _target="blank">MadeWithVue (Vue Project showcase & inspriation)</a>

---

## Setup

### Developer tools

- VS Code extensions
  - Vetur
  - Vue VS Code Snippets
  - Additional
    - Vue extension pack
    - Tabnine (auto complete)
    - Volar
    - Vue DX
- Chrome extensions
  - Vue dev tools (beta for Vue 3)

### Linux

- Install Node: [Guide](../../languages/node/node)
- CDN (Plain HTML)
  - Vue can be used without npm or webpack in plain html with a script tag similar to jQuery
  - <a href="https://www.smashingmagazine.com/2018/02/jquery-vue-javascript/" _target="blank">Article</a>
  - <a href="https://github.com/Pranay-Tej/vue-plain-html" _target="blank">Repo</a>
- Vue CLI

  ```bash
    # install vue cli
    npm i -g @vue/cli
    vue create hello-world
    cd hello-world
    npm run serve
  ```

  - (Optional) Vite dev server with vue cli project (faster development) <a href="https://wildermuth.com/2021/01/10/Vite-for-Existing-Vue-CLI-Projects" _target="blank">Article</a>
- Vite

  ```bash
    npm init @vitejs/app
    cd vue-learning
    npm i
    npm run dev
  ```

---

## Overview

:::note
:::
**NOTE:** This is combined notes for Codevolution Youtube tutorials and Vue official docs. This is only meant to serve as reference. For complete understanding follow those materials. Vue has excellent documentation.

- [Flow](vue-flow)
- [Data binding](vue-data-binding)
- [Directives](vue-directives)
- [Event handling](vue-event-handling)
- [Computed](vue-computed)
- [Watchers](vue-watchers)
- [Components](vue-components)
  - Props
    - Prop types
    - Non prop attributes
  - Provide/Inject
  - Component events
  - v-model with Components
  - Component styles
  - Dynamic Components
    - KeepAlive
- [Slots](vue-slots)
- [Form Handling](vue-form-handling)
  - v-model
  - Text Input
  - Number Input
  - Select
  - Multi Select
  - Radio
  - Checkbox
  - Date
  - Form Array
  - Dynamic Form Array
  - Nested Group
  - Array of Groups
  - API Populate
  - Vuelidate Validations
- [Teleport](vue-teleport)
- [Lifecycle Hooks](vue-lifecycle-hooks)
- [HTTP](vue-http)
- [Template Refs](vue-template-refs)
- [Mixins](vue-mixin)
- [Composition](vue-composition)
  - Data
    - Ref
    - Reactive
  - Methods
  - Computed
  - Watchers
    - with ref
    - with reactive
  - Provide/Inject
  - Lifecycle Hooks
  - Template Refs
  - Props
  - Component Events
  - Reusable Logic/Composable/Hooks
- [Vue Router](vue-router)
- [Vuex](vuex)
