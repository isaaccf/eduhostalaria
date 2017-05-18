import { Module } from 'nest.js';
import { SharedModule } from './core/shared/shared.module';
import { SessionsModule } from './routes/sessions/sessions.module';
import { UsersModule } from './routes/users/users.module';

@Module({
    modules: [UsersModule, SessionsModule],
})
export class AppModule { }
