import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { ROLES } from './../../routes/users/user.entity';
import { ForbiddenException, UnauthorizedException } from './exceptions';

export const log = function (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<any>
) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        const logger = new Logger(propertyKey);
        logger.log('Estoy aqui');
        const result = originalMethod.apply(this, args);

        return result;
    };

    return descriptor;
};

export const middleware = function (param: ROLES[]) {
    return (
        target: any,
        propertyKey: string,
        descriptor: TypedPropertyDescriptor<any>
    ) => {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args: any[]) {
            const req: Request = args[0];
            myMiddleware(param, req);
            const result = originalMethod.apply(this, args);

            return result;
        };

        return descriptor;
    };
};

function myMiddleware(roles: ROLES[], req: Request) {
    if ('user' in req) {
        const user = req['user'];
        const isAuth = roles.some(rol => {
            return user.roles.some(userRol => {
                return userRol === rol;
            });
        });
        if (!isAuth) {
            throw new ForbiddenException('');
        }

    } else {
        throw new UnauthorizedException('');
    }
}
