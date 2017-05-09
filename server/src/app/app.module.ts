import { UsersModule } from './routes/users/users.module';
import { Module } from 'nest.js';

@Module({
    modules: [UsersModule]
})
export class AppModule { }