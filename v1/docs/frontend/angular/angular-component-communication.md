---
id: angular-component-communication
title: Component Communication
sidebar_label: Component Communication
---

## Contents <!-- omit in toc -->

- [Using Parent-Child Interaction](#using-parent-child-interaction)
  - [Parent to Child](#parent-to-child)
- [Passing reference of component to others](#passing-reference-of-component-to-others)
- [Using eventemitter3 from npm](#using-eventemitter3-from-npm)

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

Read RxJS for Subjects and Observables

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

TODO

## Using eventemitter3 from npm

- Install EventEmitter3 &rarr; ```npm i eventemitter3```
- Create a service &rarr; ```EmitterService```
- Create an interface for events
- Register all events in a single centralized place ```events``` to manage easily
- Components should emit or subscribe to registered events only

```ts title="EmitterService"
import { Injectable } from "@angular/core";

import { EventEmitter } from "eventemitter3";

// Interface for events
interface Event {
    id: string;
    info: string;
}

@Injectable({
    providedIn: "root",
})
export class EmitterService {

    private eventEmitter = new EventEmitter();

    on = (event: Event, fn) => this.eventEmitter.on(event.id, fn);
    once = (event: Event, fn) => this.eventEmitter.once(event.id, fn);
    off = (event: Event, fn) => this.eventEmitter.off(event.id, fn);
    emit = (event: Event, payload?) =>
        this.eventEmitter.emit(event.id, payload);

    events = {
        dataFromWingA: {
            id: "dataFromWingA",
            info: "wingA sends data to wingB",
        },
        confirmationFromWingB: {
            id: "confirmationFromWingB",
            info: "wingB sends confirmation",
        },
    };

    constructor() {}
}
```

- Inject EmitterService and publish events

```html title="WingA.HTML"
<input type="text" [ngModel]="user_input" (ngModelChange)="sendUserInput($event)" />
```

```ts title="WingA.TS"
user_input: String;

sendUserInput(input: string) {
    this.emitterService.emit(
        this.emitterService.events.dataFromWingA,
        input
    );
}

constructor(private emitterService: EmitterService) {}

ngOnInit() {
    this.emitterService.on(
        this.emitterService.events.confirmationFromWingB,
        () => console.log("OK")
    );
}
```

- Inject and subscribe to events

```html title="WingB.HTML"
<p>
  {{ data_from_WingA }}
</p>
```

```ts title="WingB.TS"
data_from_WingA: String;

constructor(private emitterService: EmitterService) {}

ngOnInit() {
    this.emitterService.on(
        this.emitterService.events.dataFromWingA,
        (payload) => {
            this.emitterService.emit(
                this.emitterService.events.confirmationFromWingB
            );
            this.data_from_WingA = payload;
        }
    );
}
```