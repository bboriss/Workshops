# ADVANCED NODE.JS WORKSHOP (MVC + MONGO DB + JWT)

This project represent small restaurant API.

In the database should be 3 collections:

- users
- dishes
- orders

For different collections, there are different routes.

Each route is protected ( authorisation and authentification is required ) and depending on users role some routes are available to "chef" or "waiter" , some to "guest" and some are available for all users.

Authorisation and authentification is implemented through JWT module, and tokens are provided to users via cookies.

Passwords are encrypted using bcrypt module.
