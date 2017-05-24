import { Module } from '@nestjs/common';
import { SharedModule } from './../../core/shared/shared.module';
import { OrganizationsController } from "./organizations.controller";
import { OrganizationsService } from "./organizations.service";

@Module({
  components: [OrganizationsService],
  controllers: [OrganizationsController],
  exports: [],
  modules: [SharedModule],
})
export class OrganizationsModule {
  /* public configure(consumer: MiddlewaresConsumer) {
       consumer
           .apply(AuthMiddleware).forRoutes(UsersController)
           .apply(RolesMiddleware).with(roles).forRoutes(UsersController);
   }*/
}
