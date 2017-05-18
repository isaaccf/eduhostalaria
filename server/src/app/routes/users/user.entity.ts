import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

export class UserRed {
    public id: ObjectID;
    public name: string;
    public password: string;
    public email: string;
    public roles: ROLES[];
    public organizationId: ObjectID;
    public status: Status;

    constructor(user: User) {
        Object.keys(user).forEach(key => {
            if (key in this && key !== 'password') {
                this[key] = user[key];
            }
        });
    }
}

@Entity('users')
export class User {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column()
    public email: string;

    @Column()
    public roles: ROLES[];

    @Column()
    public organizationId: ObjectID;

    @Column()
    public status: Status;
}

export enum ROLES {
    ADMIN,
    CLIENT,
    GOD,
    ORGANIZER,
    PUBLIC,
    USHER,
}

export enum Status {
    PENDING,
    ACTIVE,
    DISABLED,
}
