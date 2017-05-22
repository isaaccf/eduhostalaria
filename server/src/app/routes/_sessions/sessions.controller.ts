import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { SessionsService } from './sessions.service';
import { IUserCredential } from './../../core/shared/models'
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
