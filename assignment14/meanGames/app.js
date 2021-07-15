const express = require("express");
const path = require("path");
require("./api/data/db.js");

const mongoose = require('mongoose');
const Origin = mongoose.model('Origin');

const routes = require("./api/routes")
const app = express();
app.use(express.json())

let cors = require('cors')
app.use(cors())

app.set("port", 3000);
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

// app.use("/api", function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Header", "Origin", "X-Requested-With, Content-Type, Accept");
//     next();
// });

app.use("/api", routes);
const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port);
});

// Enabling all cors requests 
// app.use(cors())
// app.get('/api', function (req, res, next) {
//     res.json({msg: "Enabled for all origins!"})
//   });

// // Enabling cors for a single route 
// app.get('/api', cors(), function (req, res, next) {
//     res.json({msg: 'Enabled for a Single Route'})
//   })
// const getApiKey = function(req, res) {
//     const apiKey = req.params.apiKey;
//     Origin.findById(apiKey).exec(function(err, origin) {
//         if(err) {
//             console.log("Invalid Key.");
//         }
//         else {
//             return origin;
//         }
//     });
// }
// origin = getApiKey(req, res);
// corsOptions = {
//     origin: 'origin.domain',
//     optionsSuccessStatus: 200
// }

// app.get('/games', cors(corsOptions), function (req, res, next) {
//     res.json({msg: 'This is CORS-enabled for only example.com.'})
// })

// Enabling for a single origin 
// let corsOptions = {
//     origin: 'http://localhost:4200',
//     optionsSuccessStatus: 200
// }

// // Enabling cors with dynamic origin 
// let whitelist = ['/api/games', '/api/games/:gameId']
// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
 
// app.get('/api', cors(corsOptions), function (req, res, next) {
//   res.json({msg: 'Enabled for a whitelisted domain.'})
// })

// // Enabling server-to-server requests 
// let corsOptions = {
//     origin: function (origin, callback) {
//       if (whitelist.indexOf(origin) !== -1 || !origin) {
//         callback(null, true)
//       } else {
//         callback(new Error('Not allowed by CORS'))
//       }
//     }
//   }

// // Enabling CORS pre-flight 
// app.options('/api/games/:gameId', cors()) // enable pre-flight request for DELETE request
// app.del('/api/games/:gameId', cors(), function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })