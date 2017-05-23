import { Component } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { SETTINGS } from '../../../environments/environment';
import { NotFoundException, UnauthorizedException } from '../../core/shared/exceptions';
import { IUserCredential } from '../../core/shared/models';
import { CredentialsService } from '../credentials/credentials.service';
import { UsersService } from './../users/users.service';

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
