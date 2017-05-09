import { Component, HttpException } from 'nest.js';

export interface IUser {
    name: string;
    id: number;
}

@Component()
export class UsersService {
    private users = [
        { id: 1, name: 'Alberto' },
        { id: 2, name: 'Arturo' },
        { id: 4, name: 'Elias' },
        { id: 3, name: 'Mario' }
    ];

    getAll(): Promise<IUser[]> {
        return Promise.resolve(this.users);
    }

    getById(id: number): Promise<IUser> {
        let user = this.users.find(user => user.id === id);
        if (!user) {
            throw new HttpException('User not found', 404);
        }
        return Promise.resolve(user);
    }
}