const express = require('express');
const path = require('path');
require('./api/data/db.js');

const app = express();

app.use(express.json({extended: false}));
app.use(express.urlencoded({extended: false}));
const routes = require('./api/routes');

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', routes);
app.set("port", 3000);
const server = app.listen(app.get('port'), function() {
    const port = server.address().port;
    console.log('Listening to port ' + port);
});