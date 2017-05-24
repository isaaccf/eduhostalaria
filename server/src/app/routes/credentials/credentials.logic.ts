import { Component, Logger } from "@nestjs/common";
import { sign } from 'jsonwebtoken';
import { SETTINGS } from '../../../environments/environment';
import { NotFoundException } from '../../core/shared/exceptions';
import { INewUserCredential, IUserCredential } from "../../core/shared/models";
import { User } from "../users/user.entity";
import { UsersService } from "../users/users.service";
import { Credential } from "./credential.entity";
import { CredentialsService } from "./credentials.service";

@Component()
export class CredentialsLogic {
  private logger: Logger;
  constructor(
    private credentialsService: CredentialsService,
    private usersService: UsersService) {
    this.logger = new Logger('CredentialsController');
  }

  public async registerNewUserCredential(newUserCredential: INewUserCredential): Promise<User> {
    let newUser = new User();
    newUser.email = newUserCredential.email;
    newUser.organizationId = newUserCredential.organizationId;
    newUser.name = newUserCredential.name;
    newUser = await this.usersService.post(newUser);
    const credential = new Credential();
    credential.userId = newUser.id;
    credential.password = newUserCredential.password;
    try {
      await this.credentialsService.post(credential);
    } catch (err) {
      await this.usersService.remove(newUser.id);
      newUser = null;
    }
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
}
