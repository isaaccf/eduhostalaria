import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { IUser, User } from './../../../config/models';
import { UserExistsException, UserGoneException, UserNotFoundException } from './users.exceptions';

@Component()
export class UsersService {
    private users: User[] = [
        { id: 1, name: 'Alberto', password: 'alberto' },
        { id: 2, name: 'Arturo', password: 'arturo' },
        { id: 3, name: 'Elias', password: 'elias' },
        { id: 4, name: 'Mario', password: 'mario' },
    ];
    private lastId = 5;

    public getAll(): Promise<User[]> {
        return Promise.resolve(this.users);
    }

    public getById(id: number): Promise<User> {
        const user = this.users.find(u => user.id === id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return Promise.resolve(user);
    }

    public validateUser(user: IUser): Promise<User> {
        const findUser = this.users.find(u => {
            return u.name === user.username && u.password === user.password;
        });

        if (!findUser) {
            throw new UserNotFoundException();
        }

        return Promise.resolve(findUser);

    }

    public add(user: User) {
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
    }

}
