import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUserCredential } from './../../core/shared/models';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {

    constructor(private sessionsService: SessionsService) { }

    // Login
    @Post()
    public async createSession( @Res() res: Response, @Body() userCredential: IUserCredential) {
        const token = await this.sessionsService.createSession(userCredential);
        res.status(HttpStatus.CREATED).json({ access_token: token });
    }
}
