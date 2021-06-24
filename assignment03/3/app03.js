const express = require('express');
const path = require('path');
require("./api/services/dbconnection.js").open();
const routes = require('./api/routes');
const app = express();

app.set('port', 3000);
app.get("/", function(req, res) {
    console.log("Get received.");
    res.status(200).sendFile(path.join(__dirname, "public", "index.html"));
});
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});
app.use('/api', routes);
const server = app.listen(app.get('port'), () => {
    const port = server.address().port;
    console.log('Listening to port ' + port);
});
app.use("/public", express.static(path.join(__dirname, "public")));