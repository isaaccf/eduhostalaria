import { UsersService } from './users.service';
import { Response, Controller, Get, Delete, Param, Post, HttpStatus } from 'nest.js';
import * as express from 'express';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    public async getAll( @Response() res: express.Response) {
        const users = await this.usersService.getAll();
        res.status(HttpStatus.OK).json(users);
    }

    @Get('/:id')
    public async getById( @Response() res: express.Response, @Param('id') id: string) {
        /*+ : Convert string to number*/
        const user = await this.usersService.getById(+id);
        res.status(HttpStatus.OK).json(user);
    }

    @Post()
    add() {

    }

    @Delete()
    remove() {

    }

}