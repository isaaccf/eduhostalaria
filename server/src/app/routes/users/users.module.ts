import { MiddlewaresConsumer, Module, RequestMethod } from 'nest.js';
import { SharedModule } from './../../core/shared/shared.module';
import { UsersController } from './users.controller';
import { AuthMiddleware } from './users.middleware';
import { UsersService } from './users.service';
import { RemoveMiddleware } from './users2.middleware';

@Module({
    components: [UsersService],
    controllers: [UsersController],
    modules: [SharedModule],
})
export class UsersModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(UsersController)
            .apply(RemoveMiddleware)
            .forRoutes({
                method: RequestMethod.DELETE,
                path: '/users/:id',
            });
    }
}
