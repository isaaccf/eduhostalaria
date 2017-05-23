import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { validateObject } from './../../core/decorators/utils';
import { DatabaseService } from './../../core/shared/database.service';
import {
    BadRequestException, ConflictException,
    GoneException, NotFoundException,
    ObjectIDException
} from './../../core/shared/exceptions';
import { INewUserCredential } from './../../core/shared/models';
import { User } from './user.entity';

@Component()
export class UsersService {
    private get repository(): Promise<Repository<User>> {
        return this.databaseService.getRepository(User);
    }

    constructor(private databaseService: DatabaseService) { }

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

    public async getByEmail(email: string): Promise<User> {
        const user = await (await this.repository).findOneById({ email });
        if (!user) {
            throw new NotFoundException('User Not Found');
        }

        return user;
    }

    @validateObject(['email', 'organizationId', 'name'])
    public async post(newUserCredential: INewUserCredential): Promise<User> {
        const repository = await this.repository;
        const userExists = await repository.findOne({ email: newUserCredential.email });
        if (userExists) {
            throw new ConflictException(`Email ''${newUserCredential.email}'' exists.`);
        }
        const newUser = Object.assign(new User(), newUserCredential);
        const savedUser = await repository.persist(newUser);

        return savedUser;
    }

    public async remove(id: string): Promise<void> {
        const repository = await this.repository;
        const userExists = await repository.findOneById(this.getObjectID(id));
        if (!userExists) {
            throw new GoneException('User');
        }
        await repository.removeById(this.getObjectID(id));
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
