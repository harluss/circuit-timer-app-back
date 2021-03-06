const mongoose = require('mongoose');
const config = require('./config');

exports.connectDB = async () => {
  try {
    await mongoose.connect(
      config.database.url,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
      () => console.log('Connected to MongoDB.'),
    );
  } catch (err) {
    console.log(`Connection to MongoDB FAILED: ${err.message}`);
  }
};

exports.disconnectDB = () => {
  mongoose.disconnect(() => console.log('Disconnected from MongoDB.'));
};
