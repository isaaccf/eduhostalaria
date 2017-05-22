import { ObjectID } from "mongodb";

export interface IUserCredential {
    email: string;
    password: string;
}
export interface INewUserCredential extends IUserCredential {
    organizationId?: ObjectID;
    name?: string
}

export interface ISettings {
    port: number;
    secret: string;
    database: string;
    host: string;
}
