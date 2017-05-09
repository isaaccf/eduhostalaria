import { RemoveMiddleware } from './users2.middleware';
import { AuthMiddleware } from './users.middleware';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Module, MiddlewaresConsumer, RequestMethod } from 'nest.js';
@Module({
    controllers: [UsersController],
    components: [UsersService]
})
export class UsersModule {
    configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UsersController)
            .apply(RemoveMiddleware)
            .forRoutes({
                path: '/users/:id', method: RequestMethod.DELETE
            })
    }
}