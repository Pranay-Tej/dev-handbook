---
id: angular-routing
title: Routing
sidebar_label: Routing
---

## Contents <!-- omit in toc -->

- [Info](#info)
- [App Routing Module](#app-routing-module)
- [Redirect](#redirect)
- [Wild-Cart Route](#wild-cart-route)
- [Children routes](#children-routes)
- [Path Variables](#path-variables)
- [Query Parameters](#query-parameters)
- [Router Outlet](#router-outlet)
- [Navigation](#navigation)
- [Module-based Routing & Lazy Loading](#module-based-routing--lazy-loading)
  - [`forChild()`](#forchild)
  - [`loadChildren`](#loadchildren)

## Info

- Angular routing is completely client-side
- Even though routes look like normal server routes, they are NOT
- All routes are independent by angular framework without leaving the browser

## App Routing Module

- A module which imports Routes, RouterModule
- Defines routes/paths
- Exports to the AppModule

```ts filename="AppRoutingModule"
    import { Routes, RouterModule } from '@angular/router';

    // define routes
    const routes : Routes = [
        {
            path : '',
            component : HomeComponent
        }
    ]

    @NgModule({
        imports : [RouterModule.forRoot(routes)],
        exports : [RouterModule]
    })

    export class AppRoutingModule
```

- Import AppRoutingModule into AppModule

```ts filename="AppModule"
imports: [AppRoutingModule];
```

---

## Redirect

```ts filename="AppRoutingModule"
const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMath: "full",
  },
  {
    path: "home",
    component: HomeComponent,
  },
];
```

---

## Wild-Cart Route

```ts filename="AppRoutingModule"
const routes: Routes = [
  // Create a PageNotFoundComponent
  // place it as the last element
  // angular will route to the corresponding component if no match is found in the paths above
  { path: "**", component: PageNotFoundComponent },
];
```

---

## Children routes

```ts filename="AppRoutingModule"
const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    children: [
      {
        // www.app.com/home/feed
        path: "feed",
        component: FeedComponent,
      },
    ],
  },
];
```

---

## Path Variables

```ts filename="AppRoutingModule"
const routes: Routes = [
  {
    // www.app.com/article/31
    path: "article/:id",
    component: ArticleComponent,
  },
];
```

```ts filename="ArticleComponent"
    import { ActivatedRoute, Params } from '@angular/router';

    constructor(
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(){
        this.activatedRoute.params.subscribe(
            params => {
                const id = <string>params['id']
                if(id != null){
                    // Load article from backend
                }
            }
        )
    }
```

---

## Query Parameters

- URL : `/articles?userId=16`

```ts filename="UserList"
navigateToArticles(id){
  this.router.navigate(['/articles'], { queryParams: { userId: '23' } });
}
```

- access queryParams

```ts filename="ArticleList"
    import { ActivatedRoute } from '@angular/router';

    constructor(
        private activatedRoute : ActivatedRoute
    ){}

    ngOnInit(){
        this.activatedRoute.queryParams.subscribe(
            queryParams => {
                const userId = <string>queryParams['userId']
                if(userId != null){
                    // Load article from backend
                }
            }
        )
    }
```

---

## Router Outlet

- Router Outlet will tell angular where to load the routed components in DOM Tree
- Keep nav-bar and footer in all pages and change main page content according to route
- Example: `/account` &rarr; Load AccountComponent in router-outlet position

```html filename="HomeComponent.HTML"
<nav></nav>
<router-outlet> </router-outlet>
<footer></footer>
```

---

## Navigation

- `routerLink`

```html filename="HomeComponent.HTML"
<a routerLink="/news">News</a>
```

- navigation through a TS file

```html filename="HomeComponent.HTML"
<a (click)="navigateToArticle()">Article31</a>
```

```ts filename="HomeComponent.TS"
    import{ Router } from '@angular/router';

    constructor(
        private router : Router
    ){}

    navigateToArticle(){
        // format [route_path, parameters]
        this.router.navigate(['/article', 31])
    }
```

---

## Module-based Routing & Lazy Loading

- App
  - UserModule
    - Home
    - NewsFeed
  - AdminModule
    - Home
    - Roles

### `forChild()`

```ts filename="AdminRoutingModule"
    const routes : Routes = [
        {
            // www.app.com/admin
            path: '',
            component: HomeComponent
        },
        {
            // www.app.com/admin/roles
            path : 'roles'
            component: RolesComponent
        }
    ]

    imports : [RouterModule.forChild(routes)]
    exports : [RouterModule]
```

### `loadChildren`

- Instead of `import`ing in AppModule
- Use `loadChildren` in the AppRoutingModule to lazy load entire admin module only when operator needs it (navigates to '/admin')

```ts filename="AppRoutingModule"
const routes: Routes = [
  {
    path: "admin",
    loadChildren: "./admin.module#AdminModule",
  },
];
```
