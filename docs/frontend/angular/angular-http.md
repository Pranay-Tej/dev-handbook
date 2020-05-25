---
id: angular-http
title: HTTP
sidebar_label: HTTP
---

## Contents <!-- omit in toc -->

## HttpClientModule

- Import into AppModule

```ts title="AppModule"
import { HttpClientModule } from '@angular/common/http';

imports : [
    HttpClientModule
]
```

- Use services to make http calls to keep the code organized and easy to manage API endpoints

## HttpClient

- Inject HttpClient into the service

```ts title="UserService"
constructor(
    private httpClient : HttpClient
){}

url : string = environment.exampleservice + '/users';

getAllUsers() : Observable<any>{
    return this.httpClient.get(this.url);
}
```

- Read [Environments Section](angular-environments)

- Inject Service into components

```ts title="UserComponent"
users : any = []

getAllUsers(){
    this.userService.getAllUsers().subscribe(
        received_users => {
            this.users = received_users;
        }
    );
}

ngOnInit(){
    this.getAllUsers();
}

constructor(
    private userService : UserService
){}
```

- Read [RxJs Section](angular-rxjs) for Observables

:::note
:::

**NOTE:**

- Always subscribe to observables (even if no data is received from endpoint)
- Otherwise, the request is NOT ACTUALLY made

## HttpOptions

```ts title="UserService"
// httpOptions is a user-defined name. Can be named as anything ex: httpOpt, opt ..

const httpOptions = {};
```

- Response Formats

```ts
const responseType = 'text';
```

- Headers

```ts
const headers = new HttpHeaders({
    'contentType': 'application/json'
});

//  to set existing property use set method
headers.set('Authorization' : 'new-auth-token');

// to add new property use append method
headers.append('Authorization' : 'new-auth-token');
```

- URL Parameters

```ts
const params = new HttpParans().set('id', '3');
```

- Add all the options to httpOptions object
  
```ts
const httpOptions = {
    'responseType' : responseType,
    'headers' : headers,
    'params' : params
} 
```

- Add httpOptions to the http call

```ts
return this.httpClient.get(url, httpOptions)
```

## Tracking Progress Events