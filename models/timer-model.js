const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TimerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    rounds_number: {
      type: Number,
      required: true,
      min: 1,
      max: 100,
    },
    rounds_timer: {
      type: Number,
      required: true,
      min: 1,
      max: 3600,
    },
    rests_timer: {
      type: Number,
      required: true,
      min: 0,
      max: 3600,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TimerSchema.pre('save', async function (next) {
  try {
    await mongoose
      .model('User')
      .findOneAndUpdate(
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
    await mongoose
      .model('User')
      .findOneAndUpdate(
        { _id: this.creator },
        { $pull: { timers: this.id } },
        { new: true }
      );
  } catch (err) {
    next(err);
  }
});

TimerSchema.options.toJSON = {
  transform(doc, ret) {
    return {
      _id: ret._id,
      name: ret.name,
      rounds_timer: ret.rounds_timer,
      rounds_number: ret.rounds_number,
      rests_timer: ret.rests_timer,
      createdAt: ret.createdAt,
      updatedAt: ret.updatedAt,
    };
  },
};

module.exports = mongoose.model('Timer', TimerSchema);
