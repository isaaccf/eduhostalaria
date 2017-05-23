import { Module } from '@nestjs/common';
import { SharedModule } from './core/shared/shared.module';
import { CredentialsModule } from './routes/credentials/credentials.module';
import { UsersModule } from './routes/users/users.module';

@Module({
    modules: [CredentialsModule, UsersModule],
})
export class AppModule { }
