import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NestFactory } from 'nest.js';
import * as winston from "winston";
import { AppModule } from './app/app.module';

const instance = express();
instance.use(bodyParser.json());

const app = NestFactory.create(AppModule, instance);

app.listen(3000, () => winston.info('Application is listening on port 3000'));
