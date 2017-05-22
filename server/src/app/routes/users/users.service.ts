import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { IUserRequest } from './../../core/shared/models';
import { DatabaseService } from './../../core/shared/database.service';
import { ObjectIDException, NotFoundException, GoneException, ConflictException, BadRequestException } from './../../core/shared/exceptions';
import { User } from './user.entity';
import { CredentialsService } from "./credentials.service";
import { Credential } from "./credential.entity";


@Component()
export class UsersService {
    private get repository(): Promise<Repository<User>> {
        return this.databaseService.getRepository(User);
    }

    constructor(private databaseService: DatabaseService, private credentialService: CredentialsService) { }

    public async getAll(): Promise<User[]> {
        const repository = await this.repository;
        const users = await repository.find();
        return users;
    }

    public async getById(id: string): Promise<User> {
        const user = (await this.repository).findOneById(this.getObjectID(id));
        if (! await user) {
            throw new NotFoundException('User Not Found');
        }
        return user;
    }

    public async validateUser(user: IUserRequest): Promise<User> {
        const repository = await this.repository;
        const userFind = await repository.findOne({
            email: user.email,
        });
        const credentialOk = await this.credentialService.getByUserIdPassword(userFind.id, user.password);
        if (!credentialOk) {
            throw new NotFoundException('Invalid Credential');
        }
        return userFind;
    }

    // TODO: Autocomplete user with default values.
    public async add(user: IUserRequest): Promise<User> {
        const fieldsValidate = ['email, password, name'];
        if (!this.validate(user, fieldsValidate)) {
            throw new BadRequestException(fieldsValidate.join(' '));
        }
        const repository = await this.repository;
        const userExists = repository.findOne({ email: user.email });
        if (await userExists) {
            throw new ConflictException(user.email);
        }
        const userCreated = await this.saveUserCredential(user);
        return userCreated;
    }
    private async saveUserCredential(userRequest: IUserRequest): Promise<User> {
        const user = Object.assign(new User(), userRequest);
        const repository = await this.repository;
        const userCreated = await repository.persist(user);
        const credential = new Credential();
        credential.userId = userCreated.id;
        credential.password = userRequest.password;
        await this.credentialService.post(credential);
        // To Do: catch credential error, and remove user
        return userCreated;
    }

    public async remove(id: string) {
        const repository = await this.repository;
        const userExists = await repository.findOneById(this.getObjectID(id));
        if (!userExists) {
            throw new GoneException('User');
        }
        const user = await repository.removeById(this.getObjectID(id));
        return null;
    }

    // TODO: Move to utils??
    /*Check if fields in test array exists in user, if not return false*/
    private validate(user: any, test: string[]): boolean {
        const keys = Object.keys(user);
        const isValid = test.every(key => key in keys);
        return isValid;
    }

    // TODO: Move to utils??
    /*Validate that string or ObjectID is correct*/
    private getObjectID(id: string | ObjectID) {
        if (!ObjectID.isValid(id)) {
            throw new ObjectIDException(id);
        }

        return new ObjectID(id);
    }
}
