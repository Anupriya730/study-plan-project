// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true ,unique: true},
    password: { type: String, required: true },
    name: { type: String, required: true }
},{ collection: 'user' });

userSchema.methods.comparePassword = async function (candidatePassword) {
    // Compare candidatePassword with this.password (hashed password in the DB)
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
