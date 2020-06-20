const db = require('../config/database');
const User = require('../models/user-model');

db.connectDB();

async function seedUsers() {
  const existingUsers = await User.find();

  if (existingUsers.length > 0) {
    console.log(
      'Existing users found. Clear DB by running "node seed/clear-data" and try seeding again.'
    );

    return db.disconnectDB();
  }

  const users = [
    { email: 'bob1@test.com', name: 'Bob', password: 'password1' },
    { email: 'steve2@test.com', name: 'Steve', password: 'password2' },
    { email: 'ricardo3@test.com', name: 'Ricardo', password: 'password3' },
  ];

  for (user of users) {
    const newUser = new User(user);
    await newUser.save();
  }

  const usersFromDB = await User.find();
  console.log('Seeded Users:', usersFromDB);

  db.disconnectDB();
}

seedUsers();
