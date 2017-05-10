import * as express from 'express';
import { HttpException, HttpStatus, Middleware, NestMiddleware } from "nest.js";
import { UsersService } from './users.service';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    /*Always implement resolve and return a function, can pass params to resolve with 'with'*/
    public resolve() {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const name = req.headers['name'];
            const users = await this.usersService.getAll();
            const user = users.find((u) => u.name === name);
            if (!user) {
                throw new HttpException('No auth', HttpStatus.UNAUTHORIZED);
            }

            next();
        };
    }
}
