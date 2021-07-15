const mongoose = require('mongoose');

const originSchema = new mongoose.Schema({
    domain: {
        type: String,
        required: true
    },
    statusbar: {
        type: Boolean
    }
});

mongoose.model('Origin', originSchema, 'origins');