const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }

});

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
    }
    next();

});

userSchema.methods.comparePassword = async function (password) {
    const match = await bcrypt.compare(password, this.password);
    return match;
};

module.exports = mongoose.model('User', userSchema);