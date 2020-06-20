const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { hashPassword } = require('../helpers/passwords');

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    password: {
      // TODO: Password validation to be strengthened with regex
      type: String,
      required: true,
      trim: true,
      minlength: 8,
    },
    timers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Timer',
      },
    ],
    resetToken: String,
    resetTokenExpiration: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    this.password = await hashPassword(this.password);
  } catch (err) {
    next(err);
  }
});

UserSchema.pre('remove', async function (next) {
  try {
    await mongoose.model('Timer').deleteMany({ creator: this.id });
  } catch (err) {
    next(err);
  }
});

UserSchema.options.toJSON = {
  transform(doc, ret) {
    return {
      _id: ret._id,
      email: ret.email,
      name: ret.name,
      timers: ret.timers,
    };
  },
};

module.exports = mongoose.model('User', UserSchema);
