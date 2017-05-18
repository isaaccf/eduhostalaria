import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { SharedModule } from './../../core/shared/shared.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    components: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
    modules: [SharedModule],
})
export class UsersModule { }
