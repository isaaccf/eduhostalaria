import { Component, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/core';
import { UserExistsException, UserGoneException, UserNotFoundException } from './users.exceptions';

export interface IUser {
    name: string;
    id?: number;
}

@Component()
export class UsersService {
    private users: IUser[] = [
        { id: 1, name: 'Alberto' },
        { id: 2, name: 'Arturo' },
        { id: 3, name: 'Elias' },
        { id: 4, name: 'Mario' },
    ];
    private lastId = 5;

    public getAll(): Promise<IUser[]> {
        return Promise.resolve(this.users);
    }

    public getById(id: number): Promise<IUser> {
        const user = this.users.find(u => user.id === id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return Promise.resolve(user);
    }

    public add(user: IUser) {
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
