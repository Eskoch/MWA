const mongoose = require("mongoose");

const nobelSchema = new mongoose.Schema({ 
    firstname: String,
    surname : String,
    affiliation : String,
    category : String,
    bornCountry : String,
    motivation: String,
    gender: String
 });

 
mongoose.model('Laureate', nobelSchema, 'laureates');    