const db = require('../config/database');
const User = require('../models/user-model');
const Timer = require('../models/timer-model');

db.connectDB();

async function clearDB() {
  await User.remove();
  await Timer.remove();
  db.disconnectDB();

  console.log('Users and Timers removed from DB!');
}

clearDB();
