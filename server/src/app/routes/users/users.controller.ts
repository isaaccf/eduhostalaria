import * as express from 'express';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Request, Response } from 'nest.js';
import { LoggerService } from './../../core/shared/logger.service';
import { UserParamsException } from './users.exceptions';
import { IUser, UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private loggerService: LoggerService) { }

    @Get()
    public async getAll( @Request() req: express.Request, @Response() res: express.Response) {
        this.loggerService.logger.info('Get');
        const users = await this.usersService.getAll();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getById( @Response() res: express.Response, @Param('id') id: string) {
        const user = await this.usersService.getById(+id);
        res.status(HttpStatus.OK).json(user);
    }

    @Post()
    public async add( @Response() res: express.Response, @Body() user: IUser) {
        if (!user.name) {
            throw new UserParamsException('name');
        }
        const newUser = await this.usersService.add(user);
        res.status(HttpStatus.CREATED).json(newUser);
    }

    @Delete('/:id')
    public async remove( @Response() res: express.Response, @Param('id') id: string) {
        await this.usersService.remove(+id);
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
