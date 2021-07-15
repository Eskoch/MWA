const mongoose = require('mongoose');

const originSchema = new mongoose.Schema({
    name: String,
    email: String,
    domain: {
        type: String,
        required: true
    },
    status: {
        type: Boolean, 
        default: true
    }
});

mongoose.model('Origin', originSchema, 'origins');