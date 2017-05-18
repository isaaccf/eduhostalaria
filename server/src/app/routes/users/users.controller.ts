import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserParamsException } from './users.exceptions';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    public async getAll( @Req() req: Request, @Res() res: Response) {
        const users = await this.usersService.getAll();
        res.status(HttpStatus.OK).json(users);
    }

  /*  @Get('/:id')
    public async getById( @Res() res: Response, @Param('id') id: string) {
        const user = await this.usersService.getById(id);
        res.status(HttpStatus.OK).json(user);
    }
*/
    /*@Post()
    public async add( @Res() res: Response, @Body() user: User) {
        if (!user.name) {
            throw new UserParamsException('name');
        }
        const newUser = await this.usersService.add(user);
        res.status(HttpStatus.CREATED).json(newUser);
    }

    @Delete('/:id')
    public async remove( @Res() res: Response, @Param('id') id: string) {
        await this.usersService.remove(+id);
        res.status(HttpStatus.NO_CONTENT).send();
    }*/
}
