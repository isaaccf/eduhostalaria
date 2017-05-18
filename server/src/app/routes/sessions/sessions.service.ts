import { Component } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { IUserRequest } from './../../../config/models';
import { SETTINGS } from './../../../config/settings';
import { UserRed } from './../users/user.entity';
import { UsersService } from './../users/users.service';

@Component()
export class SessionsService {
    constructor(private usersService: UsersService) { }

    public async createSession(user: IUserRequest): Promise<string> {
        const userFind = await this.usersService.validateUser(user);
        const userRed = new UserRed(userFind);
        try {
            const token = sign(userRed, SETTINGS.secret);
            return token;
        } catch (e) {
            throw new Error('');
        }
    }
}
