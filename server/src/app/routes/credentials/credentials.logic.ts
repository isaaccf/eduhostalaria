import { Component } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { SETTINGS } from '../../../environments/environment';
import { NotFoundException, BadRequestException } from '../../core/shared/exceptions';
import { LoggerService } from "../../core/shared/logger.service";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsService } from "./credentials.service";
import { ROLE, STATUS } from "../../core/shared/enums";
import { IUserInvitation, IUserCredential, IUserClientRegistration, IUserPublicRegistration } from "./credentials.models";

@Component()
export class CredentialsLogic {

  constructor(
    private logger: LoggerService,
    private credentialsService: CredentialsService,
    private usersService: UsersService) { }

  public async postUserClientRegistration(userRegistration: IUserClientRegistration): Promise<User> {
    let newUser = this.createUserFromUserClientRegistration(userRegistration);
    newUser = await this.usersService.post(newUser);
    newUser = await this.postCredential(newUser, userRegistration);
    this.sendConfirmationEmail(newUser);
    return newUser;
  }

  public async postUserPublicRegistration(userRegistration: IUserPublicRegistration): Promise<User> {
    let newUser = this.createUserFromUserPublicRegistration(userRegistration);
    newUser = await this.usersService.post(newUser);
    this.sendConfirmationEmail(newUser);
    return newUser;
  }

  public async postUserInvitation(userInvitation: IUserInvitation): Promise<User> {
    let newUser = this.createUserFromUserInvitation(userInvitation);
    newUser = await this.usersService.post(newUser);
    this.sendConfirmationEmail(newUser);
    return newUser;
  }

  public async getToken(userCredential: IUserCredential): Promise<string> {
    const user = await this.usersService.getByEmail(userCredential.email);
    const credential = await this.credentialsService.getByUserIdPassword(user.id, userCredential.password);
    if (!credential) {
      throw new NotFoundException('Invalid Credential');
    }
    const token = sign(user, SETTINGS.secret);
    return token;
  }

  private createUserFromUserClientRegistration(userRegistration: IUserClientRegistration): User {
    let newUser = new User();
    newUser.email = userRegistration.email;
    newUser.organizationId = userRegistration.organizationId;
    newUser.name = userRegistration.name;
    newUser.roles = [ROLE.CLIENT];
    newUser.status = STATUS.PENDING;
    return newUser;
  }

  private createUserFromUserPublicRegistration(userRegistration: IUserPublicRegistration): User {
    let newUser = new User();
    newUser.email = userRegistration.email;
    newUser.organizationId = userRegistration.organizationId;
    newUser.name = userRegistration.name;
    newUser.phone = userRegistration.phone;
    newUser.roles = [ROLE.PUBLIC];
    newUser.status = STATUS.PENDING;
    return newUser;
  }

  private createUserFromUserInvitation(userInvitation: IUserInvitation): User {
    const newUser = new User();
    newUser.email = userInvitation.email;
    newUser.organizationId = userInvitation.organizationId;
    newUser.name = userInvitation.name;
    newUser.roles = [userInvitation.role]
    newUser.status = STATUS.PENDING;
    return newUser;
  }

  private async postCredential(newUser: User, userRegistration: IUserRegistration) {
    const credential = new Credential();
    credential.userId = newUser.id;
    credential.password = userRegistration.password;
    try {
      await this.credentialsService.post(credential);
    } catch (err) {
      this.logger.error(err);
      await this.usersService.remove(newUser.id);
      newUser = null;
    }
    return newUser;
  }

  private async sendConfirmationEmail(newUser: User): Promise<boolean> {
    return true;
  }
}
