const bcrypt = require('bcryptjs');
const config = require('../config/config');

exports.hashPassword = async (password) =>
  await bcrypt.hash(password, config.bcrypt.saltRounds);

exports.comparePasswords = async (enteredPassword, userPassword) =>
  await bcrypt.compare(enteredPassword, userPassword);
