import { Module } from '@nestjs/common';
import { CredentialsModule } from '../credentials/credentials.module';
import { UsersModule } from './../users/users.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';

@Module({
    components: [SessionsService],
    controllers: [SessionsController],
    modules: [UsersModule, CredentialsModule],
})
export class SessionsModule { }
