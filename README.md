# Circuit Training Timers App Back-End

This is a MongoDB/Express/Node.js RESTful API back-end.

Main purpose of this project was to practice MExN stack back-end and build a working skeleton for possible Circuit Timers App.

### Features
* Authentication using Passport and JWT tokens
* Password encryption with bcryptjs
* Emails send with password reset token using SendGrid
* Data validation with JOI
* Objects modeling with Mongoose
* CORS enabled
* Unwanted Headers hidden with Helmet
* API collection example for POSTMAN

### Setup
Install Node packages with:
```
npm install
```
Remove `-sample` part of `.env-sample` file and provide required data:
* JWT secret
* API key for [MongoDB](https://www.mongodb.com/)
* API key for [SendGrid](https://sendgrid.com/)

Run in Development mode using Nodemon with:
```
npm run start-dev
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
  "passport": "^0.4.1",
  "passport-jwt": "^4.0.0",
  "passport-local": "^1.0.0"
},
"devDependencies": {
  "nodemon": "^2.0.2"
}
```