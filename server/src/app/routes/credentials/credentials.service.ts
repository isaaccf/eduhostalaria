import { Component } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { SETTINGS } from '../../../environments/environment';
import { DatabaseService } from '../../core/shared/database.service';
import { NotFoundException } from '../../core/shared/exceptions';
import { INewUserCredential, IUserCredential } from '../../core/shared/models';
import { User } from "../users/user.entity";
import { UsersService } from '../users/users.service';
import { Credential } from './credential.entity';

@Component()
export class CredentialsService {

  constructor(private databaseService: DatabaseService, private usersService: UsersService) { }

  private get repository(): Promise<Repository<Credential>> {
    return this.databaseService.getRepository(Credential);
  }

  public async post(user: INewUserCredential): Promise<User> {
    const newUser = await this.usersService.post(user);
    const credential = new Credential();
    credential.userId = newUser.id;
    credential.password = user.password;

    const repository = await this.repository;
    const credentials = await repository.persist(credential);

    return newUser;
  }

  public async getToken(userCredential: IUserCredential): Promise<string> {
    const user = await this.usersService.getByEmail(userCredential.email);
    const credential = await this.getByUserIdPassword(user.id, userCredential.password);
    if (!credential) {
      throw new NotFoundException('Invalid Credential');
    }

    const token = sign(user, SETTINGS.secret);

    return token;
  }

  private async getByUserIdPassword(userId: ObjectID, password: string): Promise<Credential> {
    const repository = await this.repository;
    const credentials = repository.findOne({ userId, password });

    return credentials;
  }

}
