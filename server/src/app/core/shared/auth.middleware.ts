import { Middleware, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, NotBeforeError, TokenExpiredError, verify } from 'jsonwebtoken';
import { SETTINGS } from './../../../config/settings';

@Middleware()
export class AUthMiddleware implements NestMiddleware {
    public resolve(): (req: Request, res: Response, next: NextFunction) => void {
        return (req: Request, res: Response, next: NextFunction) => {
            const auth = req.headers['authorization'];
            if (!auth) {
                throw new Error(''); // 401
            }

            const token = auth.split(' ')[1];

            verify(token, SETTINGS.secret, (err, decoded) => {
                if (err) {
                    this.parseError(err);
                    return;
                }

                req['user'] = decoded;
                next();
            });
        };
    }

    private parseError(error: TokenExpiredError | JsonWebTokenError | NotBeforeError) {
        if (error instanceof TokenExpiredError) {
            throw new Error('');
        }

        if (error instanceof JsonWebTokenError) {
            throw new Error('');
        }

        if (error instanceof NotBeforeError) {
            throw new Error('');
        }

        throw new Error(''); // Default
    }
}
