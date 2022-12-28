# Explanations

## [updateUser](database/controllers.js)

> The code for the updateUser as it works now, needs to be executed **exactly** as is — **changing any one part will likely require _almost_ everything else to change as well.**

**Explanation:**

1. `_id` **must** be derived from the `req.query` and _both_ the key and value provided should be unquoted string values:

```javascript
const { _id } = req.query;
```

2.  1.  `updates` **must** be set directly equal to `req.body`
    2.  The contents of the `body` **must** be sent as JSON, and
    3.  due to that property names **must** be [double quoted](.).

```javascript
const updates = req.body;
```

3.  1.  Neither `updates` nor `req.body` should be modified in any way
    2.  `user` needs to be declared as `const` and set equal to your database query results
    3.  `await` **must** be used
    4.  The query function **must** be assigned directly to `user`
    5.  Neither the `_id` nor `updates` should be passed in any way other than as shown
    6.  The properties being passed must already exist within the database to be updated
        -   `{ strict: false }` should be specified as a query option if you want to bypass this

```javascript
const user = await User.findByIdAndUpdate(_id, updates, {
	strict: false,
	strictQuery: false,
	new: true,
});

res.status(200).json(user);
```
