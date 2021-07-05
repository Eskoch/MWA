const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({ 
    title: String,
    salary : Number,
    location : String,
    description : String,
    experience : String,
    skills : [String],
    postDate : Date
 });

mongoose.model('Job', jobSchema, 'jobs');    