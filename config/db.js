const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        }, () => console.log('Connected to MongoDB.'));
    } catch (err) {
        console.log(`Connection to MongoDB FAILED: ${err.message}`);
    }
};