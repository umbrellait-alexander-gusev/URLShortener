import Express from 'express';
import Cors from 'cors';
import BodyParser from 'body-parser';

import { ServerPort } from '../etc/config.json';

import * as db from './utils/DataBaseUtils';

// Initialization of express application
const app = Express();

// Set up connection of database
db.setUpConnection();

// Using BodyParser middleware
app.use( BodyParser.json() );

// Allow requests from any origin
app.use(Cors({ origin: '*' }));

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

const server = app.listen(ServerPort, function() {
    console.log(`Server is up and running on port ${ServerPort}`);
});
