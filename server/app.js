import './config/validate-env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './utils/DataBaseUtils';
import './tasks/taskAutoRemoveLink';
import logger from './utils/logger';
import nanoid from 'nanoid';
import { env } from './config/config';

const apiPrefix = env.api_prefix;

// Initialization of express application
const app = express();
const serverPort = env.server_port;

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
  if (req.body.shortCustomUrl === '') {
    req.body.shortUrl = apiPrefix + '/' + req.body.shortUrl + nanoid(5);
  } else {
    req.body.shortUrl = apiPrefix + '/' + req.body.shortCustomUrl;
  }

  db.createLink(req.body).then(data => {
    logger.info(`===== new element =====`);
    logger.info(`Create element id: ${data._id}`);
    logger.info(`Save origin url: ${data.originUrl}`);
    logger.info(`Create short url: ${data.shortUrl}`);

    return res.send(data);
  });
});

const server = app.listen(serverPort, function() {
    console.log(`Server running on port ${serverPort}`);
});
