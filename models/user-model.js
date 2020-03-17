const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 10;

const UserSchema = new mongoose.Schema({
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
        type: String,
        required: true,
        trim: true
    }
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

module.exports = mongoose.model('user', UserSchema);