const mongoose = require("mongoose");

const zipSchema = new mongoose.Schema({ 
    city: String,
    zip : String,
    pop : Number,
    state : String, 
    loc : {
        type: [Number],
        index: "2dsphere"
    }
 });

 
mongoose.model('Zip', zipSchema, 'zips');    