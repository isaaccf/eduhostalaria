import { HttpException, HttpStatus } from 'nest.js';

export class NotFoundException extends HttpException {
    constructor(msg: string | object) {
        super(msg, HttpStatus.NOT_FOUND);
    }
}

export class ConflictException extends HttpException {
    constructor(msg: string | object) {
        super(msg, HttpStatus.CONFLICT);
    }
}

export class GoneException extends HttpException {
     constructor(msg: string | object) {
        super(msg, HttpStatus.GONE);
    }
}

export class BadRequestException extends HttpException {
     constructor(msg: string | object) {
        super(msg, HttpStatus.BAD_REQUEST);
    }
}