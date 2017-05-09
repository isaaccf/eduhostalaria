import { NotFoundException, GoneException, ConflictException, BadRequestException } from './../exceptions';

export class UserNotFoundException extends NotFoundException {
    constructor() {
        super('User not found.');
    }
}

export class UserExistsException extends ConflictException {
    constructor(name: string) {
        super(`User '${name}' already exists.`);
    }
}

export class UserGoneException extends GoneException {
    constructor() {
        super('User has gone');
    }
}

export class UserParamsException extends BadRequestException {
    constructor(msg: string) {
        super(`Param '${msg}' is required`);
    }
}