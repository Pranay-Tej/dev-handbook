---
id: angular-pipes
title: Pipes
sidebar_label: Pipes
---

## Definition

- Pipes are basically functions that can be used in template `{{  }}` with `|` operator and transform the data inside it
- Pipes can be chained `{{ article | async | json }}`

---

## Built-in Pipes

- json pipe is used to view API json responses rendered in html
- async pipe: TODO
- date pipe is used to show dates in different formats

---

## async pipe

- TODO (malcoded)

---

## Custom Pipes

- Create a pipe using angular-cli `ng g pipe modify` OR VS Code Angular Generator

```ts filename="modify.pipe.TS"
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "modify",
})
export class ModifyPipe implements PipeTransform {
  transform(value: any, capital?: boolean, multiply?: number): any {
    value = capital ? value.toUpperCase() : value;

    let initial_value = value;
    if (multiply) {
      for (let i = 1; i < multiply; i++) {
        value = value + " " + initial_value + " ";
      }
    }
    return value;
  }
}
```

- Use in components

```html filename="AppComponent.HTML"
<p>{{ name | modify:true:2}}</p>
```

```ts filename="AppComponent.TS"
name: string = "Hello";
```

- Result

```text filename="Result"
HELLO HELLO
```
