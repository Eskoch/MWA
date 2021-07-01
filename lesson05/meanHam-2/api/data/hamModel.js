const mongoose = require('mongoose');

const typeSchema = new mongoose.Schema({
    name: {
        type: String
    },
    desc: {
        type: String
    }
});

const contestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    month: {
        type: String,
        required: false
    },
    hours: {
        type: Number
    },
    prize: {
        type: String
    }
});

const hamSchema = new mongoose.Schema({
    name: {
        type: String
    },
    type: typeSchema,
    contests: [contestSchema]
});

mongoose.model('Ham', hamSchema, 'hams');