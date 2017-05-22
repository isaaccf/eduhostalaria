import { Component } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UsersService } from './../users/users.service';
import { IUserCredential } from "../../core/shared/models";
import { SETTINGS } from "../../../environments/environment";
import { UnauthorizedException, NotFoundException } from "../../core/shared/exceptions";
import { CredentialsService } from "../credentials/credentials.service";

@Component()
export class SessionsService {
    constructor(private usersService: UsersService, private credentialsService: CredentialsService) { }

    public async createSession(userCredential: IUserCredential): Promise<string> {
        const user = await this.usersService.getByEmail(userCredential.email);
        const credential = await this.credentialsService.getByUserIdPassword(user.id, userCredential.password);
        if (!credential) {
            throw new NotFoundException('Invalid Credential');
        }
        const token = sign(user, SETTINGS.secret);
        return token;
    }
}
