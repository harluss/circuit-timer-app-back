const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
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
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('timer', TimerSchema);