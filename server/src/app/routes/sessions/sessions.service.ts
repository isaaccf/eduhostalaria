import { Component } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IUserRequest } from './../../../config/models';
import { SETTINGS } from './../../../config/settings';
import { UsersService } from './../users/users.service';

@Component()
export class SessionsService {
    constructor(private usersService: UsersService) { }

    public async createSession(user: IUserRequest): Promise<string> {
        const userFind = await this.usersService.validateUser(user);
        delete userFind.password;
        try {
            const token = sign(userFind, SETTINGS.secret);
            return token;
        } catch (e) {
            throw new Error('');
        }
    }
}
