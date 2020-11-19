---
id: express-passwords
title: Hashing Passwords
sidebar_label: Hashing Passwords
---

## bcryptjs

- Install bcryptjs

```bash
npm i bcryptjs
```

- Hash password

```ts title="auth.router.ts"
import bcrypt from "bcryptjs";

authRouter.post("/register", async (req, res) => {
    try {
        // hash password
        // hash(password, salt)
        const passwordHash = await bcrypt.hash(password, 8);

        // save to db
        const user = await User.create({
            name: name,
            email: email,
            password: passwordHash,
        });
        res.send({ data: user });
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error });
    }
});
```

- Compare password

```ts title="auth.router.ts"
import bcrypt from "bcryptjs";

authRouter.post("/login", async (req, res) => {
    try{
        // check password
        const passwordCheck = await bcrypt.compare(
            password,
            user.toJSON().password
        );
        if (!passwordCheck) {
            throw "Incorrect password";
        }
    } catch (error) {
        res.status(400).send({ message: error });
    }
});
```
