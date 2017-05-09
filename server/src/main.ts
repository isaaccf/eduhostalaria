import { AppModule } from './app/app.module';
import { NestFactory } from 'nest.js';
import * as express from 'express';
import * as bodyParser from 'body-parser';

const instance = express();
instance.use(bodyParser.json());

const app = NestFactory.create(AppModule, instance);

app.listen(3000, () => console.log('Application is listening on port 3000'));