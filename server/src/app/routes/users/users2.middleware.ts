import * as express from 'express';
import { HttpException, HttpStatus, Middleware, NestMiddleware } from 'nest.js';
import { UsersService } from './users.service';

@Middleware()
export class RemoveMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    /*Always implement resolve and return a function, can pass params to resolve with 'with'*/
    public resolve() {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const id = +req.params['id'];
            const name = req.headers['name'];
            const user = await this.usersService.getById(id);
            if (!(user.name === name && user.id === id)) {
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            }

            next();
        };
    }
}
