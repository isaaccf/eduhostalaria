import { Component } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { DatabaseService } from '../../core/shared/database.service';
import { Credential } from './credential.entity';

@Component()
export class CredentialsService {

  constructor(private databaseService: DatabaseService) { }

  private get repository(): Promise<Repository<Credential>> {
    return this.databaseService.getRepository(Credential);
  }

  public async getByUserIdPassword(userId: ObjectID, password: string): Promise<Credential> {
    const repository = await this.repository;
    const credentials = repository.findOne({
      userId: userId,
      password: password
    });
    return credentials;
  }

  public async post(credential: Credential): Promise<Credential> {
    const repository = await this.repository;
    const credentials = repository.persist(credential);
    return credentials;
  }

}
