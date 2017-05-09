import { UsersService, IUser } from './users.service';
import { Response, Controller, Get, Delete, Param, Post, Body, HttpStatus, HttpException } from 'nest.js';
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
    public async add( @Response() res: express.Response, @Body() user: IUser) {
        if (!user.name) {
            throw new HttpException('Bad request', 400);
        }
        const u = await this.usersService.add(user);
        res.status(HttpStatus.CREATED).json(u);
    }

    @Delete('/:id')
    public async remove(@Response() res:express.Response, @Param('id') id: string) {
        const msg = await this.usersService.remove(+id)
        res.status(HttpStatus.OK).json(msg);
    }

}