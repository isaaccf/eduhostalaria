import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { ObjectId, ValidateParams} from "../../core/decorators/validate-param";
import { ValidateObject } from './../../core/decorators/validate-object';
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

    @ValidateParams
    public async getById(@ObjectId id: string): Promise<User> {
        const user = (await this.repository).findOneById(id);
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

    @ValidateObject(['email', 'organizationId', 'name'])
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

    @ValidateParams
    public async remove(@ObjectId id: string): Promise<void> {
        const repository = await this.repository;
        const userExists = await repository.findOneById(id);
        if (!userExists) {
            throw new GoneException('User');
        }
        await repository.removeById(id);
    }
}
