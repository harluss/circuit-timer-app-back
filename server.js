const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./config/database');
const app = express();
const error = require('./helpers/error');
const PORT = process.env.PORT || 5000;

db.connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());

const usersRoutes = require('./routes/users-routes');
const timersRoutes = require('./routes/timers-routes');

app.use('/api/users', usersRoutes);
app.use('/api/timers', timersRoutes);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
