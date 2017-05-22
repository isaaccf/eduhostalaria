import { Module } from '@nestjs/common';
import { UsersModule } from './../users/users.module';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { CredentialsModule } from "../credentials/credentials.module";

@Module({
    components: [SessionsService],
    controllers: [SessionsController],
    modules: [UsersModule, CredentialsModule],
})
export class SessionsModule { }
