---
id: angular-flow
title: Flow
sidebar_label: Flow
---

Source: Medium Article

- Angular.json

```ts filename="angular.json"
// build section
"options" : {
    "main" : "src/main.ts"
}
```

- Main.ts boostraps AppModule

```ts filename="main.ts"
platformBrowserDynamic().bootstrapModule(AppModule);
```

- AppModule bootstraps AppComponent

```ts filename="app.module.ts"
bootstrap : [AppComponent],
declarations : [{components}],
imports: [{modules}],
providers : [{services}],
```

- AppComponent points to AppComponent HTML page

```ts filename="app.component.ts"
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app-name";
}
```

- index.html

```html filename="index.html"
<body>
  <app-root></app-root>

  <script src="main.js"></script>

  // Script Injection done by compiler
  <script ...></script>
  <script ...></script>
</body>
```
