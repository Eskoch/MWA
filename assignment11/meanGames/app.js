const express = require("express");
const path = require("path");
require("./api/data/db.js");
const routes = require("./api/routes")
const app = express();
app.use(express.json());

app.set("port", 3000);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/api", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Header", "Origin", "X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/api", routes);
const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
});