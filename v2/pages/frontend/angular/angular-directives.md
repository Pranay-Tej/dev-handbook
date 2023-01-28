---
id: angular-directives
title: Directives
sidebar_label: Directives
---

## Contents <!-- omit in toc -->

- [Structural Directives](#structural-directives)
  - [`*ngIf`](#ngif)
    - [Usage](#usage)
    - [Logical operators](#logical-operators)
    - [Else condition](#else-condition)
    - [Then condition](#then-condition)
    - [Background working](#background-working)
  - [`*ngFor`](#ngfor)
    - [Usage](#usage-1)
    - [Access Index](#access-index)
    - [Options](#options)
    - [Re-Rendering](#re-rendering)
    - [Optimizing Re-Renders](#optimizing-re-renders)
    - [`trackBy`](#trackby)
    - [Using with non-iterables](#using-with-non-iterables)
      - [Javascript Objects](#javascript-objects)
      - [Observables](#observables)
- [Attribute Directives](#attribute-directives)
  - [`ngClass`](#ngclass)
    - [Using Plain JavaScript](#using-plain-javascript)
    - [Using `[className]` property binding](#using-classname-property-binding)
    - [Using `ngClass`](#using-ngclass)
  - [`ngStyle`](#ngstyle)
    - [Using plain JavaScript](#using-plain-javascript-1)
    - [Using property binding](#using-property-binding)
    - [Using `ngStyle`](#using-ngstyle)

## Structural Directives

- Meant to alter structure of DOM
- Start with '\*' sign

### `*ngIf`

#### Usage

- Used to render an element on a given condition

```html
<p *ngIf="counter > 1">{{ counter }}</p>
```

- `*ngIf` vs `[hidden]` and css `display : none` properties
- `*ngIf` Completely remove elements from DOM while the other properties hide the element but it still remains in the DOM tree

- Example: user id is rendered only if user is not null

```html
<p *ngIf="user">{{ user.id }}</p>
```

#### Logical operators

```html
*ngIf="a && b" and ="a || b" or = "!a" not
```

#### Else condition

```html
<div *ngIf="count > 0;else negativeBlock">
  <p>Positive</p>
</div>

<ng-template #negativeBlock>
  <p>Negative</p>
</ng-template>
```

#### Then condition

```html
<ng-template *ngIf="count > 0;then positiveBlock;else negativeBlock">
</ng-template>

<ng-template #positiveBlock>
  <p>Positive</p>
</ng-template>

<ng-template #negativeBlock>
  <p>Negative</p>
</ng-template>
```

#### Background working

```html
<div *ngIf="count > 0;else negativeBlock">
  <p>Positive</p>
</div>

<ng-template #negativeBlock>
  <p>Negative</p>
</ng-template>
```

is converted to

```html
<ng-template [ngIf]="count > 0" [ngIfElse]="negativeBlock">
  <div>
    <p>Positive</p>
  </div>
</ng-template>

<ng-template #negativeBlock>
  <p>Negative</p>
</ng-template>
```

### `*ngFor`

#### Usage

- Used to iterate DOM elements as an array

```html
<ul>
  <li *ngFor="let item of array">{{ item }}</li>
</ul>
```

is converted to

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
</ul>
```

#### Access Index

```html
<ul>
  <li *ngFor="let item of array; let i=index">{{ i }}</li>
</ul>
```

#### Options

- `first`
- `last`
- `even` &rarr; returns `true` if element is even indexed
- `odd`

Example: Specify even, odd elements

```html
<div
  *ngFor="let item of items;
    let isEven=even;
    let isOdd=odd"
>
  <ng-template *ngIf="isEven; then evenBlock; else oddBlock"> </ng-template>

  <ng-template #evenBlock>Even</ng-template>
  <ng-template #oddBlock>Odd</ng-template>
</div>
```

Output:

```text
Even item 0
Odd item 1
Even item 2
Odd item 3
Even item 4
```

#### Re-Rendering

- List is re-rendered on following occurrences
  - add
  - remove
  - reorder

#### Optimizing Re-Renders

- Angular uses reference of objects to re-render only new components added/removed
- But when using REST API objects change and references change
- So angular has to re-render entire list
- There is a way to tell Angular if we have 'unique id' to track in the list items

#### `trackBy`

- Create a function that returns item id

```ts
items = [
    {
        guid : 'item_id_00'
        name : 'item_name_00'
    },
    {
        guid : 'item_id_01'
        name : 'item_name_01'
    }
]

trackElement(index : number, item : any){
    if(item){
        return item.guid;
    }else{
        return null
    }
}
```

```html
<ul>
  <li
    *ngFor="let item of items;
        trackBy:trackElement"
  >
    {{ item }}
  </li>
</ul>
```

#### Using with non-iterables

##### Javascript Objects

```html
<ul>
  <li *ngFor="let elem of object | values"></li>
</ul>
```

- Create a pipe

```ts filename="values.pipe.ts"
import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "values",
})
export class ValuesPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let values = [];
    for (let key in value) {
      values.push(value[key]);
    }
    return values;
  }
}
```

##### Observables

- Use `async` provided by Angular

```html
<ul>
    <li *ngFor="let elem of test_observable$ | async>
</ul>
```

## Attribute Directives

- Change appearance and behaviour of an element or component

### `ngClass`

#### Using Plain JavaScript

```js
let elem = document.getElementById("exampleDiv");
elem.className = "example-class";
```

#### Using `[className]` property binding

```html
<!-- example-class => string -->
<div [className]="example-class"></div>
```

- Based on condition

```html
<!-- is_positive => boolean, example-class => string -->
<div [className]="is_positive ? 'example-class' : 'other-class">Positive</div>
```

- Toggle Class on condition

```html
<!-- active_nav_bar => class name, is_active => boolean -->
<div [class.active_nav_bar]="is_active">Nav</div>
```

#### Using `ngClass`

- Assign a class

```html
<div [ngClass]="'example-class'"></div>
```

- Assign multiple class

```html
<div [ngClass]="['example-class', 'is-active']"></div>
```

- Based on condition

```html
<!-- example-class => string, contitionA => boolean -->
<div
  [ngClass]="{
        'example-class' : conditionA,
        'is-active' : is_active
    }"
>
  Nav-Bar
</div>
```

- Set classes through TS file

```html filename="ExampleComponent.HTML"
<div [ngClass]="setClass()"></div>
```

```ts filename="ExampleComponent.TS"
setClasses() {
    let classes = {
        'example-class' : conditionA,
        'other-class' : conditionB
    };

    return classes;
}
```

### `ngStyle`

#### Using plain JavaScript

```js
elem = document.getElementById("example-div");
elem.style.color = "blue";
```

#### Using property binding

```html
<!-- blue => string -->
<div [style.color]="blue"></div>
```

OR define variable in TS file

```html
<!-- primary-color => variable defined in TS file -->
<div [style.color]="primary-color"></div>
```

```ts
primary-color : string = 'blue'
```

- Condition based

```html
<!-- isPrimary => boolean, colorA & colorB => strings or variables defined in TS file -->
<div [style.color]="isPrimary ? colorA : colorB"></div>
```

#### Using `ngStyle`

Used to add inline-CSS to elements

```html
<!-- string expression after '=' sign is similar to css expression  -->
<div [ngStyle]="{'color' : 'blue'}">Text</div>
```

- Condition based

```html
<div
  [ngStyle]="{
        'color' : conditionA ? colorA : colorB,
        'margin' : '8px'
    }"
></div>
```
