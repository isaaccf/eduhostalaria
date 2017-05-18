import { Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from 'jsonwebtoken';
import { SETTINGS } from './../../../config/settings';
import { ROLES, UserRed } from './../../routes/users/user.entity';
import { ForbiddenException, UnauthorizedException } from './exceptions';

@Middleware()
export class RolesMiddleware implements NestMiddleware {
    public resolve(roles: ROLES[]): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            if ('user' in req) {
                const user: UserRed = req['user'];
                const isAuth = roles.some(rol => {
                    return user.roles.some(userRol => {
                        return userRol === rol;
                    });
                });

                if (!isAuth) {
                    throw new ForbiddenException('');
                }

                return next();
            }

            throw new UnauthorizedException('');
        };
    }

}
