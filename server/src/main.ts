import * as bodyParser from 'body-parser';
import * as express from 'express';
import { NestFactory } from 'nest.js';
import { AppModule } from './app/app.module';
import { SETTINGS } from './environments/environment';

const instance = express();
instance.use(bodyParser.json());

const app = NestFactory.create(AppModule, instance);

app.listen(SETTINGS.port, () => console.info(`Application is listening on port ${SETTINGS.port}`));
