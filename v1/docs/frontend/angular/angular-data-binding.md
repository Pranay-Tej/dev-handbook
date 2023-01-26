---
id: angular-data-binding
title: Data Binding
sidebar_label: Data Binding
---

## Contents <!-- omit in toc -->

- [Definition](#definition)
- [Interpolation](#interpolation)
- [Property Binding](#property-binding)
- [Event Binding](#event-binding)
  - [Event Binding keywords](#event-binding-keywords)
  - [Passing event data](#passing-event-data)
  - [```event.target```](#eventtarget)
  - [Useful event bindings](#useful-event-bindings)
- [Two-Way Binding](#two-way-binding)
  - [```ngModel```](#ngmodel)
- [Examples](#examples)
  - [Capitalize UserInput in the textbox](#capitalize-userinput-in-the-textbox)
  - [Show button pressed by the user](#show-button-pressed-by-the-user)

## Definition

- Linking TS file (Logic) to HTML Template (View) is called Data Binding

## Interpolation

```html title="ArticleComponent.HTML"
<p>
    {{ name }}
</p>
```

```ts title="ArticleComponent.TS"
name : string = 'Article Name';
```

## Property Binding

```html title="ArticleComponent.HTML"
<a title="{{ title_variable }}">Article31</a>
<!-- or -->
<a [title]="title_variable">Article31</a>
```

```ts title="ArticleComponent.TS"
title_variable : string = 'Open Article31';
```

## Event Binding

```html title="ArticleComponent.HTML"
<button (click)="openArticle()">Open</button>
```

```ts title="ArticleComponent.TS"
openArticle() : void {
    // Load article from backend
}
```

### Event Binding keywords

- Remove 'on' from HTML DOM events to get Angular Event Bindings
- Examples:
  - ```onclick="function"``` &rarr; ```(click)="function"```
  - ```onKeyup="function"``` &rarr; ```(keyup)="function"```

### Passing event data

- Every event contains ```$event``` which contains more information about the event occurred
- Pass ```$event``` to the function to act on it
- Example: ```(click)``` &rarr; ```$event``` &rarr; contains click location

```html title="ArticleComponent.HTML"
<button (click)="drawPoint($event)">Draw</button>
```

```ts title="ArticleComponent.TS"
drawPoint(event: MouseEvent) : void {
    // Use Mouse event methods
}
```

### ```event.target```

- All standard DOM event objects have a 'target' property which is a reference to the element that raised the event
- In the below example event is raised on ```<input>``` element which has property 'value'
- ```<input value="...">``` &rarr; ```event.target.value```

```html title="ArticleComponent.HTML"
<input (keyup)="function($event)">Draw</input>
```

```ts title="ArticleComponent.TS"
function(event: any) : void {
    console.log(event.target.value)
}
```

### Useful event bindings

- ```(click)```
- ```(keyup)``` &rarr; ```(keyup.enter)``` or ```(event.Key)```
- ```(focus)```
- ```(blur)```
- ```(ngModelChange)```

## Two-Way Binding

```html title="ArticleComponent.HTML"
<input [(ngModel)] = "name" type="text"/>

<p>{{ name }}</p>
```

```ts title="ArticleComponent.TS"
name : string;
```

### ```ngModel```

- Import ```FormsModule``` to use ```ngModel```

```ts title="AppModule"
import { FormsModule } from '@angular/forms'

@NgModule({
   imports: [
      FormsModule,
   ],
})
```

```[(ngModel)] = "name``` is equivalent to ```[ngModel] = "name"``` + ```(ngModelChange) = "name = $event"```

- Gives more control to act or modify data by defining a function for ```(ngModelChange)``` event
- Useful to update parent component's data without adding an additional event handler

```html title="ArticleComponent.HTML"
<input
    [ngModel] = "name"
    (ngModelChange)="capitalizeWord($event)"
    type="text"
/>

<p>{{ capitalized_name }}</p>
```

```ts title="ArticleComponent.TS"
capitalized_name : string;
capitalize(name : string){
    this.capitalized_name = name.toUppercase();
}
```

## Template Reference Variable

- ```event.target``` &rarr; ```#name```
- All the snippets below have same result

### Method 1

```html title="ArticleComponent.HTML"
<input
    [ngModel] = "name"
    (ngModelChange)="name=$event"
    type="text"
/>

<p>{{ name }}</p>
```

```ts title="ArticleComponent.TS"
name : string;
```

### Method 2

```html title="ArticleComponent.HTML"
<input
    [ngModel] = "name"
    (ngModelChange)="setNameInTS($event)"
    type="text"
/>

<p>{{ name }}</p>
```

```ts title="ArticleComponent.TS"
name : string;

setName(input_text : string){
    this.name = input_text;
}
```

### Method 3

```html
<input
    #name
    (keyup)="1"
    <!-- or -->
    <!-- assignment is not necessary as name.value returns value of input element -->
    (keyup)="name.value=$event.target.value"
    type="text"
/>

<!-- calling 'value' property of the 'name' reference variable -->
<p>{{ name.value }}</p>
```

## Examples

### Capitalize UserInput in the textbox

```html
<input
    [ngModel] = "name"
    (ngModelChange)="name=$event.toUppercase()"
    type="text"
/>

<p>{{ name }}</p>
```

```html
<input
    #name
    (keyup)="name.value=name.value.toUppercase()"
    type="text"
/>

<!-- calling 'value' property of the 'name' reference variable -->
<p>{{ name.value }}</p>
```

```html
<input
    #name
    (keyup)="name.value=$event.target.value.toUppercase()"
    type="text"
/>

<!-- calling 'value' property of the 'name' reference variable -->
<p>{{ name.value }}</p>
```

### Show button pressed by the user

```html
<input
    (keyup)="key_pressed=$event.key"
    type="text"
/>

<p>{{ key_pressed }}</p>
```
