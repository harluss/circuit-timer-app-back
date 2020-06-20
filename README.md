# Circuit Training Timers App Back-End

This is a MongoDB/Express/Node.js RESTful API back-end.

Main purpose of this project was to practice MExN stack back-end and build a working skeleton for possible Circuit Timers App.

### Features

- Authentication using Passport and JWT tokens
- Password encryption with bcryptjs
- Emails send with password reset token using SendGrid
- Data validation with JOI
- Objects modeling with Mongoose
- CORS enabled
- Unwanted Headers hidden with Helmet
- Logs with Morgan
- API collection example for POSTMAN
- Pre-commit hook with Husky and Lint-Staged to check and format code with ESLint and Prettier

### Setup

Install Node packages with:

```
npm install
```

`config/config.js` file lists all required environmental variables and API keys:

- API key for [MongoDB](https://www.mongodb.com/)
- API key for [SendGrid](https://sendgrid.com/)

Run in Development mode using Nodemon with:

```
npm run dev
```

`timers.postman_collection.json` contains all endpoints with required objects/arguments and can be used in Postman to manipulate Users (Register, Login, Delete - self, Reset Password) and Timers (Get All, Get One by ID, Add, Update, Delete).

To seed dummy users run (timers must be added manually):

```
node seed/seed-data
```

To wipe all data run:

```
node seed/clear-data
```

### Packages

```
  "dependencies": {
    "@hapi/joi": "^17.1.1",
    "@sendgrid/mail": "^7.1.1",
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "helmet": "^3.21.3",
    "http-status-codes": "^1.4.0",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.9.3",
    "morgan": "^1.10.0",
    "passport": "^0.4.1",
    "passport-jwt": "^4.0.0",
    "passport-local": "^1.0.0"
  },
  "devDependencies": {
    "eslint": "^6.8.0",
    "eslint-config-airbnb-base": "^14.2.0",
    "eslint-config-node": "^4.1.0",
    "eslint-config-prettier": "^6.11.0",
    "eslint-plugin-import": "^2.21.2",
    "eslint-plugin-node": "^11.1.0",
    "eslint-plugin-prettier": "^3.1.4",
    "husky": "^4.2.5",
    "lint-staged": "^10.2.11",
    "nodemon": "^2.0.2",
    "prettier": "^2.0.5"
  },
```
