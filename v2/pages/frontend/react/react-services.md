---
id: react-services
title: Services
sidebar_label: Services
---

## Organize

- Maintaining configuration and services is not mandatory but separately keeps the project organized
- Create a folder for services `src/services`

---

## Config

- Use different API for production and development

```ts filename="services/config.ts"
const config = {
  API: () => {
    if (process.env.NODE_ENV == "production") {
      return "https://example-app.herokuapp.com/user-service";
    } else {
      return "http://127.0.0.1:8080/user-service";
    }
  },
};

export default config;
```

---

## Services

- Use different service files for different logics and calling API endpoints: `userService, todoService`
- Import config into services

```ts filename="services/userService.ts"
import config from "./config";

const API = config.API();

const userService = {
  getUsers: () => {
    return fetch(`${API}`, { method: "GET" }).then((response) =>
      response.json()
    );
  },
  getUserById: (id: string) => {
    return fetch(`${API}/${id}`, { method: "GET" }).then((response) =>
      response.json()
    );
  },
};

export default userService;
```

---

## Call Services in Components

```ts filename="UserList.tsx"
import React, { useState, useEffect } from "react";
import userService from "../../../../services/userService";

function UserList() {
  const [user_list, setUser_list] = useState([]);

  const refreshUserList = () => {
    userService.getUsers().then((data) => setUsers(data));
  };

  useEffect(() => {
    refreshUserList();
  }, []);
}
```

- Read useEffect in Life Cycle Methods
