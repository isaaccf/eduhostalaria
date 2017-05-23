import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { AppModule } from './app/app.module';
import { SETTINGS } from './environments/environment';

const logger = new Logger('Main');
const instance = express();
instance.use(bodyParser.json());
instance.use(cors());

const app = NestFactory.create(AppModule, instance);

app.listen(SETTINGS.port, () => logger.log(`Application is listening on port ${SETTINGS.port}`));
