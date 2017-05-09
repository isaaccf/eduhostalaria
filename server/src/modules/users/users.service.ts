import { Component, HttpException } from 'nest.js';

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
        { id: 4, name: 'Mario' }
    ];
    private lastId = 5;

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

    add(user: IUser) {
        const u = this.users.find(u => u.name === user.name);
        if (u) {
            throw new HttpException(`User ${user.name} exsists`, 409);
        }

        user.id = this.lastId++;
        this.users.push(user);

        return Promise.resolve(user);
    }

    remove(id: number) {
        const index = this.users.findIndex(user => user.id === id);
        if (index === -1) {
            throw new HttpException('User already delete', 410)
        }
        this.users.splice(index, 1);
        
        return Promise.resolve();
    }


}