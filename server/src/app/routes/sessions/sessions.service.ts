import { Component } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from './../users/users.service';
import { IUserRequest } from "../../core/shared/models";
import { SETTINGS } from "../../../environments/environment";
import { UnauthorizedException } from "../../core/shared/exceptions";

@Component()
export class SessionsService {
    constructor(private usersService: UsersService) { }

    public async createSession(user: IUserRequest): Promise<string> {
        const userFind = await this.usersService.validateUser(user);
        const token = sign(userFind, SETTINGS.secret);
        return token;
    }
}
