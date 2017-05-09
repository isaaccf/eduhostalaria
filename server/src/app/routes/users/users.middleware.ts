import { UsersService } from './users.service';
import { HttpException, Middleware, NestMiddleware, HttpStatus } from 'nest.js';
import * as express from 'express';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    /*Always implement resolve and return a function, can pass params to resolve with 'with'*/
    resolve() {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const name = req.headers['name'];
            const users = await this.usersService.getAll();
            const user = users.find(user => user.name === name);
            if (!user) {
                throw new HttpException('No auth', HttpStatus.UNAUTHORIZED);
            }

            next();
        }
    }
}