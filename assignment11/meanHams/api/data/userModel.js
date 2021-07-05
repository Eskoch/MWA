const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    name: String
});

mongoose.model('User', userSchema, 'users');