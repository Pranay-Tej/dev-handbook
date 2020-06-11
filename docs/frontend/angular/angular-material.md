---
id: angular-material
title: Angular Material
sidebar_label: Angular Material
---

## Courses

- [Official Docs](https://material.angular.io/)

## Setup

Follow official Docs

## Change Default Theme

- Search for ```"styles":``` in ```angular.json```
- Switch to preferred theme
  - [Options in Docs](https://material.angular.io/guide/theming)

## Material Module

- Organize material components in a single module
- Create a module ```MaterialModule``` in ```modules/``` folder
- Import necessary Angular Material modules from ```@angular/material```
- Export those modules in ```exports: []```
- Import MaterialModule into AppModule

```ts title="MaterialModule"
import { NgModule } from '@angular/core';

// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
  ],
  exports: [
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
  ],
  declarations: []
})
export class MaterialModule { }

```

```ts title="AppModule"
import { MaterialModule } from './modules/material.module';

@NgModule({
   declarations: [],
   imports: [
      MaterialModule,
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
```