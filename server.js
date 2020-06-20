const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config/config');
const db = require('./config/database');
const error = require('./middleware/error');
const usersRoutes = require('./routes/users-routes');
const timersRoutes = require('./routes/timers-routes');

const PORT = config.port;
const app = express();

db.connectDB();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/users', usersRoutes);
app.use('/api/timers', timersRoutes);

app.use(error);

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
