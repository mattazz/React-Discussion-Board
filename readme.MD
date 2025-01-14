# About
Simple React / ExpressJS web application discussion board.

## Security and Authentication

This application uses `bcrypt` and `jwt` for security and authentication.

### Bcrypt
Bcrypt is used to hash user passwords before storing them in the database. This ensures that even if the database is compromised, the passwords remain secure. The hashing is implemented in the [`userSchema.pre('save')`](models/User.js) middleware in the [User model](models/User.js).

### JWT (JSON Web Token)
JWT is used for authenticating users. When a user logs in, a token is generated and sent back to the client. This token is then included in the `Authorization` header of subsequent requests to protected routes. The token is verified using the `jsonwebtoken` library in the [auth middleware](middleware/auth.js).

### Implementation Details
- User registration and login routes are defined in the [auth routes](routes/auth.js).
- Password hashing is done using bcrypt in the [User model](models/User.js).
- JWT tokens are generated and verified in the [auth routes](routes/auth.js) and [auth middleware](middleware/auth.js).

This setup ensures that user data is securely stored and that only authenticated users can access protected routes.