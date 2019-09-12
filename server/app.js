import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
import './tasks/TaskAutoRemoveLink';

const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
    path: path.resolve("./.env")
});

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

const server = app.listen(process.env.REACT_APP_SERVER_PORT, function() {
    console.log(`Server is up and running on port ${process.env.REACT_APP_SERVER_PORT}`);
});