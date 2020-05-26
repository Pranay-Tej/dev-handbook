---
id: angular-http
title: HTTP
sidebar_label: HTTP
---

## Contents <!-- omit in toc -->

- [HttpClientModule](#httpclientmodule)
- [Tracking Progress Events](#tracking-progress-events)
- [Interceptors](#interceptors)
  - [Using Interceptors](#using-interceptors)

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

## Interceptors

- Used to modify request before it hits the server
- HTTP API &rarr; Interceptors &rarr; Actual Request
- Example: Add auth-token to all http requests
  - Option 1: Add auth-token to headers in all http requests
  - Option 2: Append auth-token in every request automatically with Interceptor
- Interceptors are injectables
- implements HttpInterceptor
- There are multiple interceptors organized in a chain structure
- First one is called by the Angular framework
- We need to call next interceptor manually using ```next.handle(req);``` after we are done with the request

- Defining Interceptor

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(
        req : HttpRequest<any>,
        next : HttpHandler
    ) : Observable<HttpEvent<any>>{
        req.headers.append('Authorization', 'x-auth-token-x');
        return next.handle(req);
    }
}
```

- Providing Interceptors

```ts title="AppModule"
import { HTTP_INTERCEPTORS } from '@angular/common/http';

providers : [
    {
        providers : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
    }
]
```

## Caching http Requests

- Source : [malcoded](https://malcoded.com/posts/angular-fundamentals-services)

### Using service

```ts title="CachedHttpService"
interface Whatever {
    id : string;
}

@Injectable()
export class CachedHttpService {
    private cache = {}

    constructor(private http: HttpClient) {}

    public getWhatever(id: string): Observable<Whatever> {
        if (this.cache[id] == null) {
            // If we have no response in cache, reach out to the web
            const observable = this.getWhateverHttpRequest(id);

            // We need to subscribe to the result, to write the result to our cache
            let subscription = observable.first().subscribe(
                response => {
                // Wite the response to cache
                this.cache[id] = response;
            })

            console.log('Cached Http: Read from server')
            return observable;
        } else {
            //If we have the response in our cache already, just serve that response
            console.log('Cached Http: Read from cache')
            return Observable.of(this.cache[id])
        }
    }

    private getWhateverHttpRequest(id: string): Observable<Whatever> {
        // Only for test purposes
        // return Observable.of({ id: 'result' })
        return this.http.get<Whatever>(url + id);
    }
}

```

- Add this service to AppModule ```providers``` OR add ```{ providedIn : 'root' }``` in the service itself

### Using Interceptors