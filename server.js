const config = require('./config/config');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const db = require('./config/database');
const app = express();
const error = require('./helpers/error');
const usersRoutes = require('./routes/users-routes');
const timersRoutes = require('./routes/timers-routes');
const morgan = require('morgan');

const PORT = config.port;

db.connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', usersRoutes);
app.use('/api/timers', timersRoutes);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
