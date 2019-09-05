const express = require("express");
const cors = require("cors");
const bodyParser = require("bodyParser");

const serverPort = require("../etc/config.json");

const db = require('./utils/DataBaseUtils');

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/links', (req, res) => {
    db.listLinks().then(data => res.send(data));
});

app.post('/links', (req, res) => {
    db.createLink(req.body).then(data => res.send(data));
});

app.delete('/links/:id', (req, res) => {
    db.deleteLink(req.params.id).then(data => res.send(data));
});

const server = app.listen(serverPort, function() {
    console.log(`Server is up and running on port ${serverPort}`);
});
