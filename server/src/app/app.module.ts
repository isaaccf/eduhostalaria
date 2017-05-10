import { Module } from 'nest.js';
import { UsersModule } from './routes/users/users.module';

@Module({
    modules: [UsersModule],
})
export class AppModule { }
