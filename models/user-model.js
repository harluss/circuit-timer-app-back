const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 10;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        // TODO: Password validation to be strengthened with regex for production build
        type: String,
        required: true,
        trim: true
    },
    timers: [{
        type: Schema.Types.ObjectId,
        ref: 'Timer'
    }],
    resetToken: String,
    resetTokenExpiration: Date,
}, {
    timestamps: true
});

UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }

        this.password = await bcrypt.hash(this.password, BCRYPT_SALT_ROUNDS);
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
        delete ret.password;
    }
}

module.exports = mongoose.model('User', UserSchema);