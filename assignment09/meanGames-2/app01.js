const express = require("express");
const path = require("path");
require("./api/data/db.js");
const routes = require("./api/routes")
require("dotenv").config();
const app = express();
app.use(express.json());

app.set("port", process.env.PORT);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.use("/api", routes);
const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
});