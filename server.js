const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./config/db');
const app = express();
const error = require('./helpers/error');

dotenv.config();
db.connectDB();

// TODO: login - passport
// TODO: validation - joi or express-validator
// TODO: add helpers (auth, validation)
// TODO: connect users and timers
// TODO: set config file (keys, environments (dev, test, prod), .env vars)
// TODO: handle db connection errors
// TODO: move strings to seperate file
// TODO: add getTimers sorting (date, name, length?)
// TODO: tests - mocha/chai or jest
// TODO: logging?
// TODO: documentation
// TODO: expand timer model
// TODO: indexes as interfaces?

app.use(cors());
app.use(helmet());
app.use(express.json());

const authRoutes = require('./routes/auth-routes');
const timersRoutes = require('./routes/timers-routes');

app.use('/api/auth', authRoutes);
app.use('/api/timers', timersRoutes);

app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));