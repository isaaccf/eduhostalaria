import { Module } from 'nest.js';
import { SharedModule } from './core/shared/shared.module';
import { UsersModule } from './routes/users/users.module';

@Module({
    modules: [UsersModule],
})
export class AppModule { }
