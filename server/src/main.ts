import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { NestFactory } from 'nest.js';
import { AppModule } from './app/app.module';
import { SETTINGS } from './environments/environment';

const instance = express();
instance.use(bodyParser.json());
instance.use(cors());

const app = NestFactory.create(AppModule, instance);

app.listen(SETTINGS.port, () => console.info(`Application is listening on port ${SETTINGS.port}`));
