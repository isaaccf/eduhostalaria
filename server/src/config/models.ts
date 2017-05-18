export interface IUser {
    username: string;
    password: string;
}

export interface User {
    name: string;
    password: string;
    id?: number;
}

export interface ISettings {
    port: number;
    secret: string;

}
