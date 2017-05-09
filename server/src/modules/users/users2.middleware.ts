import { UsersService } from './users.service';
import { HttpException, Middleware, NestMiddleware, HttpStatus } from 'nest.js';
import * as express from 'express';

@Middleware()
export class RemoveMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    /*Always implement resolve and return a function, can pass params to resolve with 'with'*/
    resolve() {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const id = +req.params['id'];
            const name = req.headers['name'];
            const user = await this.usersService.getById(id);
            if (!(user.name === name && user.id === id)) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }

            next();
        }
    }
}