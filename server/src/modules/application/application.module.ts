import { UsersModule } from './../users/users.module';
import { Module } from 'nest.js';

@Module({
    modules: [UsersModule]
})
export class ApplicationModule {}