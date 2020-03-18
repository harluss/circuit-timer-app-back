const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./config/database');
const app = express();
const error = require('./helpers/error');

dotenv.config();
db.connectDB();

// TODO: login - passport using social media (google, facebook, github)
// TODO: set config file (keys, environments (dev, test, prod), .env vars)
// TODO: handle db connection errors
// TODO: move strings to seperate file
// TODO: add getTimers sorting (date, name, length?)
// TODO: add customer errors to passport
// TODO: add regex to name and password validation
// TODO: tests - mocha/chai or jest
// TODO: logging?
// TODO: documentation
// TODO: expand timer model
// TODO: indexes as interfaces?
// TODO: Update README.md
// TODO: Password reset + mail module?
// TODO: Delete User

app.use(cors());
app.use(helmet());
app.use(express.json());

const authRoutes = require('./routes/user-routes');
const timersRoutes = require('./routes/timers-routes');

app.use('/api/user', authRoutes);
app.use('/api/timers', timersRoutes);

app.use(error);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));