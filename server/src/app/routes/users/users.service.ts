import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { IUserRequest } from './../../../config/models';
import { DatabaseService } from './../../core/shared/database.service';
import { ObjectIDException } from './../../core/shared/exceptions';
import { User, UserRed } from './user.entity';
import { UserExistsException, UserGoneException, UserNotFoundException, UserParamsException } from './users.exceptions';

@Component()
export class UsersService {
    private get repository(): Promise<Repository<User>> {
        return this.databaseService.getRepository(User);
    }

    constructor(private databaseService: DatabaseService) { }

    public async getAll(): Promise<UserRed[]> {
        const users = (await this.repository).find();
        return (await users).map(user => new UserRed(user));
    }

    public async getById(id: string): Promise<User> {
        const user = (await this.repository).findOneById(this.getObjectID(id));
        if (! await user) {
            throw new UserNotFoundException();
        }

        return new UserRed(await user);
    }

    public async validateUser(user: IUserRequest): Promise<UserRed> {
        const userFind = (await this.repository).findOne({
            password: user.password,
            email: user.email,
        });

        if (! await userFind) {
            throw new UserNotFoundException();
        }

        return new UserRed(await userFind);

    }

    public async add(user: User): Promise<UserRed> {
        const fieldsValidate = ['email, password, name'];
        if (!this.validate(user, fieldsValidate)) {
            throw new UserParamsException(fieldsValidate.join(' '));
        }
        const userExists = (await this.repository).findOne({ email: user.email });
        if (await userExists) {
            throw new UserExistsException(user.email);
        }
        const userCreated = (await this.repository).persist(user);

        return new UserRed(await userCreated);
    }

    public async remove(id: string) {
        const userExists = (await this.repository).findOneById(this.getObjectID(id));
        if (!await userExists) {
            throw new UserGoneException();
        }
        const user = (await this.repository).removeById(this.getObjectID(id));
        return user;
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
