import { Module, Shared } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
    components: [DatabaseService],
    exports: [DatabaseService],
})
export class SharedModule { }
