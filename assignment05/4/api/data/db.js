const mongoose = require("mongoose");
require("./school-model.js");
const dbURL = "mongodb://localhost:27017/SchoolDB";

mongoose.connect(dbURL, {useNewParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + dbURL);
});
mongoose.connection.on("disconnected", function() {
    console.log("Mongoose disconnected.");
});
mongoose.connection.on("error", function() {
    console.log("Mongoose connection error " + error);
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by app termination.");
        process.exit(0);
    });
});
process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnnected by app termination.");
    });
});
process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected by app termination.");
    });
});