import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module } from 'nest.js';
@Module({
    controllers: [UsersController],
    components: [UsersService]
})
export class UsersModule { }