import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUserRequest } from './../../../config/models';
import { SessionsService } from './sessions.service';

@Controller('sessions')
export class SessionsController {

    constructor(private sessionsService: SessionsService) { }

    @Post()
    public async createSession( @Res() res: Response, @Body() user: IUserRequest) {
        const token = await this.sessionsService.createSession(user);
        res.status(HttpStatus.CREATED).json({ access_token: token });
    }
}
