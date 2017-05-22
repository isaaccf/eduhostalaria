import { Module } from "@nestjs/common";
import { CredentialsService } from "./credentials.service";
import { CredentialsController } from "./credentials.controller";
import { UsersModule } from "../users/users.module";
import { SharedModule } from "../../core/shared/shared.module";

@Module({
  components: [CredentialsService],
  controllers: [CredentialsController],
  exports: [CredentialsService],
  modules: [UsersModule, SharedModule],
})
export class CredentialsModule {

}