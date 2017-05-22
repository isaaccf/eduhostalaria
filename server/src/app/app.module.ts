import { Module } from 'nest.js';
import { SharedModule } from './core/shared/shared.module';
import { UsersModule } from './routes/users/users.module';
import { CredentialsModule } from "./routes/credentials/credentials.module";

@Module({
    modules: [CredentialsModule, UsersModule],
})
export class AppModule { }
