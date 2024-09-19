const mongoose = require('mongoose');

// Create User Schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    id: {
        type: String
    },
    photo: {
        type:  String
    }
});

// Create and export User model
const User = mongoose.model('User', UserSchema);
module.exports = User;
