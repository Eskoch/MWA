const express = require("express");
const path = require("path");
const app = express();

app.set("port", 3000);
app.use(function(req, res, next) {
    console.log(req.method,req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.get("/json", function(req, res) {
    console.log("JSON request received");
    res.status(200).json({"jsonData": true});
});
app.get("/file", function(req, res) {
    console.log("File request received");
    res.status(200).sendFile(path.join(__dirname, "app13.js"));
});
const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
});