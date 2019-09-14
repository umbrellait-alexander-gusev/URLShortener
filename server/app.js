import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
import './tasks/TaskAutoRemoveLink';
import env from './config/config';
import logger from './utils/logger';

const ServerPort = env.server_port;

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
    db.createLink(req.body).then(data => {
        logger.info(`Create element id: ${data._id}`);
        logger.info(`Save origin url: ${data.URLOrigin}`);
        logger.info(`Create short url: ${data.URLShort}`);

        return res.send(data);
    });
});

app.delete('/links/:id', (req, res) => {
    db.deleteLink(req.params.id).then(data => res.send(data));
});

const server = app.listen(ServerPort, function() {
    console.log(`Server is up and running on port ${ServerPort}`);
});