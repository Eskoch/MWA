const express = require("express");
const path = require("path");
require("./api/data/db.js");
const apiControllers = require("./api/controllers/origins.controllers");
const mongoose = require('mongoose');
const Origin = mongoose.model('Origin');

const routes = require("./api/routes")
const app = express();
app.use(express.json())

let cors = require('cors')
app.use(cors("*"))

app.set("port", 3000);
app.use(function(req, res, next) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const origin = req.protocol + '://' +req.get('host');
    const referrer = req.headers.referer;
    console.log("referrer " + referrer)
    console.log("Full url : " + fullUrl);
    console.log("origin : " + origin);
    console.log(req.method, req.url, req.body);
    Origin.findOne({"domain": referrer}).then(result => {
        console.log(result)
        if(fullUrl === "http://localhost:3000/api/origins/") {
            next();
        }
        else if(result != null && (result.status)) {
            next();
        } else {
            console.log("forbiden request");
            return res.status(403).json({message : "Forbiden Request"});
        }
    });
});
app.use(express.static(path.join(__dirname, "public")));
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

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

// Enabling cors for a single route 
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