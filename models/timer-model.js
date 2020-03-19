const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
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

TimerSchema.pre('save', async function (next) {
    try {
        await mongoose.model('User').findOneAndUpdate(
            { _id: this.creator },
            { $push: { timers: this.id } },
            { new: true }
        );
    } catch (err) {
        next(err);
    }
});

TimerSchema.pre('remove', async function (next) {
    try {
        await mongoose.model('User').findOneAndUpdate(
            { _id: this.creator },
            { $pull: { timers: this.id } },
            { new: true }
        );
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('Timer', TimerSchema);