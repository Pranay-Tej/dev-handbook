---
id: angular-services
title: Services
sidebar_label: Services
---

## Contents <!-- omit in toc -->

- [Usage](#usage)
- [```@Injectable```](#injectable)
- [Dependency Injection](#dependency-injection)
  - [Injection Tree](#injection-tree)

## Usage

- Managing Logic
- [http calls to backend](angular-http)
- Caching http
- [Component Communication](angular-component-communication)

## ```@Injectable```

- Used for dependency injection
- services defined in AppModule have application level scope

- Use ```providedIn``` in the service itself to make it have application level scope

```ts
    @Injectable({
    // makes the services available application-wide
    providedIn: 'root'
})
```

## Dependency Injection

Create same instance of a single ```@Injectable``` class instead of creating them in every component

- Create a service

```ts title="TestService"
    // make the file a service
    @Injectable({})
    // function
    calculate(){}
    // export
    export class TestService()
```

- Expose the service to Angular's Dependency Injection

```ts title="AppModule"
    providers : [
        TestService
    ]
```

- Use it in components

```ts title="TestComponent"
    constructor(
        private testService: TestService
    ){}

    this.testService.calculate();
```

### Injection Tree

- If we add TestService Injectable to component each instance of component receives separate instance of TestService
- But nested components receive same instance as their parent component

```ts title="ParentComponent"
    @Component({
        selector : 'parent',
        templateUrl : './parent.component.html',
        styleUrls : ['./parent.component.css'],
        // provide service in a component
        providers: [TestService]
    })
```
