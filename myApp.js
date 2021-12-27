var express = require('express');
const bodyParser = require("body-parser");
var app = express();
require('dotenv').config();

console.log("Hello World");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(
    "/",
    function (req, res) {
        //res.send("Hello Express");
        const absolutePath = __dirname + "/views/index.html";
        res.sendFile(absolutePath);
    });

app.get(
    "/json",
    function (req, res) {
        var jsonMessage;
        if (process.env.MESSAGE_STYLE==='uppercase')
            jsonMessage = {"message": "HELLO JSON"};
        else
            jsonMessage = {"message": "Hello json"};
        res.json(jsonMessage);
    }
);

app.get(
    "/now",
    function (req, res, next) {
        req.time = new Date().toString();
        next();
    },
    function (req, res) {
        res.json({ time: req.time });
    }
);

app.get(
    "/:word/echo",
    function (req, res) {
        res.json({ echo: req.params.word });
    }
);

app.get(
    "/name",
    function (req, res) {
        const queryObject = req.query;
        res.json({ name: queryObject.first + ' ' + queryObject.last });
    }
);

module.exports = app;