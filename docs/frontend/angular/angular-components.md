---
id: angular-components
title: Components
sidebar_label: Components
---

## Contents <!-- omit in toc -->

- [Definition](#definition)
- [```@Component```](#component)
- [HTML Template](#html-template)
- [Data binding](#data-binding)
- [Directives](#directives)
- [Life Cycle of Components](#life-cycle-of-components)
- [Input and Output](#input-and-output)
  - [```@Input```](#input)
  - [```@Output```](#output)

## Definition

- Building blocks of the angular app.
- Every component consists of three sections
  - ```TS``` file &rarr; for logic
  - ```HTML``` file &rarr; HTML template
  - ```CSS``` file &rarr; styles for the template

## ```@Component```

```ts title="TestComponent"
    @Component({
        selector : 'test',
        templateUrl : './test.component.html',
        styleUrls : ['./test.component.css']
    })
```

- ```selector``` defines html like tag we can use in pages
- ```templateUrl``` defines path for html template
- ```styleUrls``` defines css files to be use for the html template

## HTML Template

- Looks like a normal html but it is NOT
- Syntax extended to allow
  - Custom component selectors ```<nav-bar></nav-bar>```
  - Data binding ```{{ count }}```
  - Directives ```*ngIf```
- Browser CANNOT understand bare template. It has to interpreted by angular framework first

## Data binding

- Interpolation
  - html ```{{ count }}```
  - ts ```count : number = 5```
- Property Binding
  - ```<a [title] = "link_title">```
- Event Binding
  - ```<button (click) = "calculate()">```
- Two-Way Binding
  - ```<input [(ngModel)] = "userInput">```

Read [Data Binding Section](angular-data-binding)

## Directives

- Structural Directives
  - ```*ngIf```
  - ```*ngFor```
  - ```*ngSwitch``
- Attribute Directives
  - ```ngClass```
  - ```ngStyle```

Read [Directives Section](angular-directives)

## Life Cycle of Components

Component has a life cycle managed by Angular and provides life cycle hooks to act when they occur

:::note
:::

**NOTE:** ```Constructor()``` is called before ```ngOnInit()```

Order:

- ```Constructor()```
- ```ngOnChanges()```
- ```ngOnInit()```
- ```ngOnDestroy()```

## Input and Output

### ```@Input```

```ts title="Child.TS"
  @Input('count') public count: number;
```

```html title="Parent.HTML"
  <div>
    <child [count] = 5></child>
  </div>
```

```html title="Child.HTML"
  <div>
    {{ count }}
  </div>
```

### ```@Output```

```ts title="Child.TS"
  @Output('passCount') public countEmitter: EventEmitter<number> = new Emitter();
  this.countEmitter.next(5);
```

```html title="Parent.HTML"
  <div>
    <child (passCount) = "receiveCount($event)"></child>
    <p>{{ count }}</p>
  </div>
```

```ts title="Parent.TS"
  count: number;
  receiveCount(count: number){
    this.count = count;
  }
```

Read [Component Communication Section](angular-component-communication)
