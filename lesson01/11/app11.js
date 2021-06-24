const express = require("express");
const app = express();

const path = require("path");

app.set("port", 3000); 
app.get("/", function(req,res) {
    console.log("GET recieved");
    res.status(404).send("Received your GET request.");
});
app.get("/json", function(req, res) {
    console.log("JSON request recieved");
    res.status(200).json({"jsonData": true});
});
app.get("/file", function(req, res) {
    console.log("File request received");
    res.status(200).sendFile(path.join(__dirname, "app11.js"));
});

const server = app.listen(app.get("port"), function(){
    const port = server.address().port;
    console.log("Listening to port " + port);
});
