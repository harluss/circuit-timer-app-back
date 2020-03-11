const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    rounds_number: {
        type: Number,
        required: true
    },
    rounds_timer: {
        type: Number,
        required: true
    },
    rests_timer: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('timer', TimerSchema);