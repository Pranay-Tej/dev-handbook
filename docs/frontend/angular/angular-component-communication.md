---
id: angular-component-communication
title: Component Communication
sidebar_label: Component Communication
---

## Contents <!-- omit in toc -->

- [Using Parent-Child Interaction](#using-parent-child-interaction)
  - [Parent to Child](#parent-to-child)
- [Passing reference of component to others](#passing-reference-of-component-to-others)

## Using Parent-Child Interaction

### Parent to Child

Read [Data-Binding Section](angular-data-binding) for ```[(ngModel)]```

```html title="Parent.HTML"
<input type="text" [(ngModel)]="userInput">

<app-child [userInput]="userInput"></app-child>
```

```ts title="Child.TS"
import { Input } from '@angular/core'; // First, import Input


@Input() userInput : string;

// OR use different alias

@Input('userInput') received_userInput : string;
```

```html title="Child.HTML"
<p>{{ received_userInput }}</p>
```

### Child to Parent

```html title="Child.HTML"
<input
    type="text"
    [ngModel]=userInput
    (ngModelChange)=sendToParent($event)
>
```

```ts title="Child.TS"
import { Output, EventEmitter } from '@angular/core';

@Output() userInputEmitter = new EventEmitter();

// OR use a alias

@Output('userInput') userInputEmitter = new EventEmitter();

sendToParent(userInput){
    this.userInputEmitter.next(userInput);
}
```

```html title="Parent.HTML"
<app-child (userInput)=receiveFromChild($event)></app-child>

<p>{{ received_UserInput }}</p>
```

```ts title="Parent.TS"
received_UserInput : string;

receiveFromChild(userInput){
    this.received_UserInput = userInput
}
```

## Using Services

Read [RxJS](angular-rxjs) for Subjects and Observables

```ts title="CommunicationService"
// msgEmitter = new EventEmitter<string>();

private msgSubject = new BehaviourSubject('default');
msgObservable = this.msgSubject.asObservable();

passMsg(id : string){
    // this.msgEmitter.next(id);
    this.msgSubject.next(id);
}
```

```ts title="SenderComponent"
constructor(
    private communicationService: CommunicationService
){}

passId(id){
    this.communicationService.passMsg(id);
}
```

```ts title="ReceiverComponent"
constructor(
    private communicationService: CommunicationService
){}

productId : string;

ngOnInit(){
    this.communicationService.msgObservable.subscribe(
        received_id => {
            this.productId = received_id;
        }
    );
}
```

## Passing reference of component to others
