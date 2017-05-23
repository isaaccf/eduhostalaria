import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { INewUserCredential } from './../../core/shared/models';
import { DatabaseService } from './../../core/shared/database.service';
import { ObjectIDException, NotFoundException, GoneException, ConflictException, BadRequestException } from './../../core/shared/exceptions';
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
        const user = (await this.repository).findOneById({
            email: email,
        });
        if (! await user) {
            throw new NotFoundException('User Not Found');
        }
        return user;
    }

    public async post(newUserCredential: INewUserCredential): Promise<User> {
        const fieldsValidate = ['email', 'organizationId', 'name'];
        if (!this.validate(newUserCredential, fieldsValidate)) {
            throw new BadRequestException(fieldsValidate.join(' '));
        }
        const repository = await this.repository;
        const userExists = repository.findOne({ email: newUserCredential.email });
        if (await userExists) {
            throw new ConflictException(newUserCredential.email);
        }
        const newUser = Object.assign(new User(), newUserCredential);
        const savedUser = await repository.persist(newUser);
        return savedUser;
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
        console.info(JSON.stringify(test));
        const keys = Object.keys(user);
        console.info(JSON.stringify(keys));
        const isValid = test.every(key => key in keys);
        return true;
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
