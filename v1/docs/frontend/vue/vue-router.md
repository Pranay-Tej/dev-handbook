---
id: vue-router
title: Vue Router
sidebar_label: Vue Router
---

<a href="https://next.router.vuejs.org" _target="blank">Official Docs</a>

## Setup

### vue-cli

`vue create vue-router` and select manual, select router, yes for history

### Manual setup

install `vue-router` package

create `views` in separate folder

group folders based on features

```jsx
views
	jobs
		JobList.vue
		JobDetail.vue
	articles
		ArticleList.vue
		ArticleForm.vue
```

router file in `router`  folder

```jsx
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
```

And use router before mounting

```jsx
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
```

## router-link, router-view

```jsx
<router-link to="/">Go to Home</router-link>
<router-link to="/about">Go to About</router-link>

// Views will dynamically load here
<router-view></router-view>
```

## Programmatic routing

```jsx
router.push({ path: '/about' })
// or
router.push('/about')
```

## Named routes

```jsx
{
    path: '/user/:username',
    name: 'user',
    component: User
}

<router-link :to="{ name: 'user', params: { username: 'erina' }}">
  User
</router-link>

router.push({ name: 'user', params: { username: 'erina' }})
```

## Dynamic routing

### route params

```jsx
const User = {
  template: '<div>User {{ $route.params.id }}</div>',
}

const routes = [
	// will match users/31
  { path: '/users/:id', component: User },
]

// template
<router-link to="/user/31">Go to About</router-link>
<router-link :to="{ path: '/user', params: { id: '31' }}">User</router-link>

// programmatic
router.push({ path: '/user', params: { id: 'drake' } })
```

### query params

```jsx
// /user?plan=premium

const User = {
  template: '<div>User {{ $route.query.plan }}</div>',
}

const routes = [
  { path: '/users', component: User },
]

// template
<router-link to="/about?plan=premium">About</router-link>
<router-link :to="{ path: '/about', query: { plan: 'premium' }}">About</router-link>

// programmatic
router.push({ name: 'user', query: { plan: 'premium' } })
```

## Redirect

```jsx
const routes = [{ path: '/home', redirect: '/' }]
```

## Wild card route 404 not found view

```jsx
routes = [
	// wildcard route at bottom
	,
	{
    path: "/:pathMatch(.*)*",
    component: NotFound,
  }
]
```

## Nested routes

```jsx
routes: [
    {
      path: '/users/:username',
      component: User,
      children: [
        // UserHome will be rendered inside User's <router-view>
        // when /users/:username is matched
        { path: '', component: UserHome },

        // UserProfile will be rendered inside User's <router-view>
        // when /users/:username/profile is matched
        { path: 'profile', component: UserProfile },

        // UserPosts will be rendered inside User's <router-view>
        // when /users/:username/posts is matched
        { path: 'posts', component: UserPosts },
      ],
    },
  ],
```

## Lazy loading/Code splitting

```jsx
{
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
		// all chunks with same webpackChunkName are loaded at once
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
```

## Guard

View docs for complete guide

```jsx
{
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
```

NOTE: guards are triggered only when coming from a different route

Use hooks to transform routes

```jsx
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```

Global guards on `router` object

```jsx
router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = await canUserAccess(to)
  if (!canAccess) return '/login'
})
```

## Route meta fields

```jsx
const routes = [
  {
    path: '/posts',
    component: PostsLayout,
    children: [
      {
        path: 'new',
        component: PostsNew,
        // only authenticated users can create posts
        meta: { requiresAuth: true }
      }
}
]

router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})
```

## Data fetching

```jsx
created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
```

## Composition API usage

```jsx
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    function pushWithQuery(query) {
      router.push({
        name: 'search',
        query: {
          ...route.query,
        },
      })
    }
  },
}
```

## Transitions

```jsx
<router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" />
  </transition>
</router-view>

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
```

### per route

```jsx
const routes = [
  {
    path: '/custom-transition',
    component: PanelLeft,
    meta: { transition: 'slide-left' },
  },
]

<router-view v-slot="{ Component, route }">
  <!-- Use any custom transition and fallback to `fade` -->
  <transition :name="route.meta.transition || 'fade'">
    <component :is="Component" />
  </transition>
</router-view>
```

## Scroll Position

```jsx
const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})
```
