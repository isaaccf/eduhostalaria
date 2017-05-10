import { Module } from 'nest.js';
import { LoggerService } from './logger.service';

@Module({
    components: [LoggerService],
    exports: [LoggerService],
})
export class SharedModule { }
