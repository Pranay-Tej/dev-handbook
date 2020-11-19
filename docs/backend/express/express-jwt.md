---
id: express-jwt
title: JWT
sidebar_label: JWT
---

## jsonwebtoken package

- Install jsonwebtoken

```bash
npm i jsonwebtoken
```

---

## Sign token

- Create a token secret in environment variables

```text title=".env"
TOKEN_SECRET=abcd1234
```

- Sign token on user login

```ts title="auth.router.ts"
import jwt from "jsonwebtoken";

authRouter.post("/login", async (req, res) => {
    try {
        const token = jwt.sign(
            { _id: user.toJSON()._id },
            process.env.TOKEN_SECRET as string,
            { expiresIn: 600 }
        );
        res.send({ token });
    } catch (error) {
        res.status(401).send({ message: error });
    }
});
```

---

## Verify

```ts title="auth.util.ts"
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const protect = (req: Request, res: Response, next: NextFunction) => {
    const bearerToken: string = req.header("Authorization") as string;
    if (!bearerToken) {
        res.status(401).send({ message: "Unauthorized!" });
        // return;
    }

    try {
        if(typeof bearerToken !== undefined){
            const token = bearerToken.split('Bearer ')[1];
            const user_id = jwt.verify(token, process.env.TOKEN_SECRET as string);
            const user = User.findById(user_id);
            if (!user) {
                res.status(401).send({ message: "User not found!" });
            }
            req.body.user = user_id;
            next();
        }else{
            throw new Error("Invalid Token");
        }
    } catch (error) {
        res.status(401).send({ message: "Invalid Token!" });
    }
};
```

---

## Protect routes

- Add middleware in `app.ts` to protect routes

```ts title="app.ts"
import protect from "./utils/auth.util";

// middleware
app.use("/safe", protect);

// not protected
app.get("/", function (req: Request, res: Response) {
    res.send({ message: "Hello TypeScript!" });
});

// protected
app.get("/safe", function (req: Request, res: Response) {
    console.log(req.body);
    res.send({ message: "Hello TypeScript!", user: req.body.user });
});

// protected
app.get("/safe/verify", function (req: Request, res: Response) {
    console.log(req.body);
    res.send({ message: "Valid User!", user: req.body.user });
});
```

- Now all routes starting with `/safe` will be protected