import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NestFactory } from 'nest.js';
import * as winston from "winston";
import { AppModule } from './app/app.module';
import { SETTINGS } from './config/settings';

const instance = express();
instance.use(bodyParser.json());

const app = NestFactory.create(AppModule, instance);

app.listen(SETTINGS.port, () => winston.info(`Application is listening on port ${SETTINGS.port}`));
