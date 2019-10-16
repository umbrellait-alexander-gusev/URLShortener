import './config/validate-env';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as db from './utils/dataBaseUtils';
import { AppError } from './utils/validErrors';
import { logger } from './utils/logger';
import nanoid from 'nanoid';
import * as yup from 'yup';
import { env } from './config/config';

const schema = yup.object().shape({
  customSlug: yup
    .string()
    .max(5)
    .label('Slug'),
  url: yup
    .string()
    .url()
    .required()
    .label('Url'),
});

// Initialization of express application
const app = express();
const serverPort = env.server_port;

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.json());

// Allow requests from any origin
app.use(cors({ origin: '*' }));

app.get('/checkSlug', (req, res) => {
  db.uniqueSlug(req.query.slug).then((data) => res.send(data));
});

app.get('/getUrl', (req, res) => {
  db.getUrl(req.query.slug).then((data) => res.send(data));
});

app.post('/links', (req, res) => {
  schema
    .validate(req.body, { stripUnknown: true, abortEarly: false })
    .then((payload) => {
      const link = {
        slug: payload.customSlug,
        url: payload.url,
      };

      if (link.slug === '') {
        link.slug = nanoid(5);
      }

      return db.createLink(link);
    })
    .then((data) => {
      logger.info(`===== New element =====`);
      logger.info(`Create element id: ${data._id}`);
      logger.info(`Create short url: ${data.slug}`);
      logger.info(`Save url: ${data.url}`);

      return res.send(data);
    })
    .catch((error) => {
      const errorValid = new AppError(error);
      return res.status(400).send(errorValid);
    });
});

app.listen(serverPort, function() {
  console.log(`Server running on port ${serverPort}`);
});
