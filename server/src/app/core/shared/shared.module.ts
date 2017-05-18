import { Module, Shared } from '@nestjs/common';
import { ISettings } from './../../../config/models';
import { DatabaseService } from './database.service';

@Module({
    components: [DatabaseService],
    exports: [DatabaseService],
})
export class SharedModule { }
