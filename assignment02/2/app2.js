const express = require("express");
const path = require("path");
const app = express();

app.set("port", 3000);
app.get("/", function(req, res) {
    console.log("Get received.");
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});

const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
});

app.use(express.static(path.join(__dirname, "public")));
app.use("/public", express.static(path.join(__dirname, "public")));