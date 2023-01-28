---
id: angular-modules
title: Modules
sidebar_label: Modules
---

## Contents <!-- omit in toc -->

- [Definition](#definition)
- [`@NgModule`](#ngmodule)
- [Example](#example)
- [Lazy Loading](#lazy-loading)

## Definition

Files where we define

- Components to be used by the module
- Services
- Other Modules to be imported

## `@NgModule`

- `[bootstrap] : []` Define the root component
- `[declarations] : []`
  - components
  - directives
  - pipes

:::note
:::

- **NOTE:**
- A Component can only be declared in one module
- To use a Component in two different Modules A and B, define a third Module C and export the component to A and B

- `[imports] : []` Define sub modules to be imported into the current module
- `[exports] : []` Define components, directives, pipes to be exported to other Modules
- `[providers] : []`
  - Define `@Injectable` services required by the module
  - Any sub-modules will get the same instance of the service
  - In case of AppModule, there services are application-scoped

## Example

Components

- Login
- Register
- Help

Group these under AuthenticationModule and Export

```ts filename="AuthenticationModule"
    declarations : [Login, Register, Help],
    exports : [Login, Register, Help]
```

Import AuthenticationModule into AppModule

```ts filename="AppModule"
imports: [AuthenticationModule];
```

:::note
:::

**NOTE:** Module is removed from imports when lazy-loading

## Lazy Loading

Load only required modules based on current requirement

Example: User viewing the app may not require admin-module to be loaded

Read [**Routing Section**](angular-routing)
