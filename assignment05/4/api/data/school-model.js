const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    credit: {
        type: Number,
        required: false
    },
    professor: {
        type: String,
        required: false
    }
});

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    GPA: {
        type: Number, 
        required: true,
        min: 2.75,
        max: 4.0
    },
    courses: courseSchema
});

mongoose.model("Student", studentSchema, "Students");