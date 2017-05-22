import { ObjectID } from "mongodb";

export interface IUserRequest {
    email: string;
    password: string;
    organizationId?: ObjectID;
    name?: string
}

export interface ISettings {
    port: number;
    secret: string;
    database: string;
    host: string;
}
