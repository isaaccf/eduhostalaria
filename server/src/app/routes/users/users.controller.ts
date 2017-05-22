import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { log, middleware } from './../../core/shared/prueba';
import { ROLES, User } from './user.entity';
import { UsersService } from './users.service';
import { InternalServerErrorException } from "../../core/shared/exceptions";
import { IUserRequest } from "../../core/shared/models";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    @log
    @middleware([ROLES.GOD])
    public async getAll( @Req() req: Request, @Res() res: Response) {
        try {
            const users = await this.usersService.getAll();
            res.status(HttpStatus.OK).json(users);
        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException('');
        }
    }

    @Get('/:id')
    public async getById( @Res() res: Response, @Param('id') id: string) {
        try {
            const user = await this.usersService.getById(id);
            res.status(HttpStatus.OK).json(user);
        } catch (err) {
            console.error(err);
            throw new InternalServerErrorException('');
        }
    }

    @Post()
    public async add( @Res() res: Response, @Body() user: IUserRequest) {
        const newUser = await this.usersService.add(user);
        res.status(HttpStatus.CREATED).json(newUser);
    }

    @Delete('/:id')
    public async remove( @Res() res: Response, @Param('id') id: string) {
        await this.usersService.remove(id);
        res.status(HttpStatus.NO_CONTENT).send();
    }
}
