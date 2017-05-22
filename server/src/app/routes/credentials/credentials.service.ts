import { Component } from "@nestjs/common";
import { Credential } from "./credential.entity";
import { DatabaseService } from "../../core/shared/database.service";
import { Repository } from "typeorm";
import { ObjectID } from "mongodb";

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