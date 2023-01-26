---
id: angular-jwt-auth
title: JWT Authentication
sidebar_label: JWT Authentication
---

## HTTP Interceptor

- Create a http interceptor to add token to  all outgoing http requests
  - Create a service
    - with VS Code extension (OR)
    - with `ng generate service token-interceptor`
  - Implement `HttpInterceptor` interface
  - Implement `inercept()` method
- Add `Authorization` header to outgoing request
- If response results in `401 Unauthorized` error, redirect to login page

```ts title="token-interceptor-service.ts"
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // req.headers.append('Authorization', `Bearer ${this.authService.getToken()}`);
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
      },
    });

    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle410Error(req, next, error);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handle410Error(req: HttpRequest<any>, next: HttpHandler, error) {
    this.router.navigate(['/login']);
    // return next.handle(req);
    return throwError(error);
  }
}

```

- Register Interceptor at `AppModule`

```ts title="app.module.ts"
providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenInterceptorService,
      multi : true
  }
  ],
```

---

## Auth Guard

- Create Auth Guard to protect private routes
  - Create a service
    - with VS Code extension (OR)
    - with `ng generate service auth-guard`
  - Implement `CanActivate` interface
  - Implement `canActivate()` method
- If there is no token redirect to login

```ts title="auth-guard-service.ts"
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let token = this.authService.getToken();

    if(token === null){
      this.router.navigate(['/login'])
      return false;
    }else{
      return true;
    }
  }
}
```

---

## Router Module

- Add `canActivate` property to private routes in `RouterModule`

```ts title="app.routing.module.ts"
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  }
];
```

---

## Auth Service

- Create Auth Service to manage token, login and logout
  - Create a service
    - with VS Code extension (OR)
    - with `ng generate service auth-guard`

```ts title="auth.service.ts"
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) {}

  verifyToken(): Observable<any> {
    return this.httpClient.get(`${environment.api_url}/safe/verify`);
  }

  login(email, password): Observable<any> {
    return this.httpClient.post(`${environment.api_url}/api/user/login`, {
      email: email,
      password: password,
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  setToken(token): void {
    localStorage.setItem('token', token);
  }
}
```

---

## Login Component

```html title="login.component.html"
<div>
    <input type="text" name="email" id="email" #emailRef />
    <input type="password" name="password" id="password" #passwordRef />
    <button type="submit" (click)="login(emailRef.value, passwordRef.value)">Login</button>
</div>
```

- On `ngOnInit()` verify token and if it is valid, redirect to home
- On `login()` method if token is received from service on successful login, redirect to home

```ts title="login.component.ts"
constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.verifyToken().subscribe((data) => {
      if (data.user !== null) {
        this.router.navigate(['/home']);
      }
    });
  }

  login(email, password) {
    this.authService.login(email, password).subscribe((data) => {
      if (data.token !== null) {
        this.authService.setToken(data.token);
        this.router.navigate(['/home']);
      }
    });
  }
```

---

## Logout

```html title="home.component.html"
<button (click)="logout()">Logout</button>
```

```ts title="home.component.ts"
  logout() {
    this.authService.logout();
  }
```