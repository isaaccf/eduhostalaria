import { IUserRequest } from './../../../config/models';
import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { ObjectID } from 'mongodb';
import { Repository } from 'typeorm';
import { DatabaseService } from './../../core/shared/database.service';
import { ObjectIDException } from './../../core/shared/exceptions';
import { User, UserRed } from './user.entity';
import { UserExistsException, UserGoneException, UserNotFoundException } from './users.exceptions';

@Component()
export class UsersService {
    private get respository(): Promise<Repository<User>> {
        return this.databaseService.getRepository(User);
    }

    constructor(private databaseService: DatabaseService) { }

    public async getAll(): Promise<UserRed[]> {
        const users = (await this.respository).find();
        return (await users).map(user => new UserRed(user));
    }

  /*  public async getById(id: string): Promise<User> {
        const user = (await this.respository).findOneById(this.getObjectID(id));
        if (!user) {
            throw new UserNotFoundException();
        }

        return new UserRed(await user);
    }

    public async validateUser(user: IUserRequest): Promise<User> {
        const userFind = (await this.respository).findOne({
            password: user.password,
            email: user.email,
        });

        if (!userFind) {
            throw new UserNotFoundException();
        }

        return new UserRed(await userFind);

    }*/

    /* public add(user: User) {
         const userExists = this.users.find(u => u.name === user.name);
         if (userExists) {
             throw new UserExistsException(user.name);
         }

         user.id = this.lastId++;
         this.users.push(user);

         return Promise.resolve(user);
     }

     public remove(id: number) {
         const index = this.users.findIndex(user => user.id === id);
         if (index === -1) {
             throw new UserGoneException();
         }
         this.users.splice(index, 1);

         return Promise.resolve();
     }*/

    private getObjectID(id: string | ObjectID) {
        if (!ObjectID.isValid(id)) {
            throw new ObjectIDException(id);
        }

        return new ObjectID(id);
    }
}
