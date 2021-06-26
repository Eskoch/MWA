const express = require("express");
const path = require("path");
require("./api/data/db.js");
const routes = require("./api/routes")
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json({extended: false}));

app.set("port", 3000);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", routes);
const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listenign to port " + port);
});