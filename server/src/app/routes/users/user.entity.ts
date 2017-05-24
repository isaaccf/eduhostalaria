import { ObjectID } from 'mongodb';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('users')
export class User {
    @ObjectIdColumn()
    public id: ObjectID;

    @Column()
    public name: string;

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
