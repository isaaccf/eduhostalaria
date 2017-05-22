export interface IUserRequest {
    email: string;
    password: string;
}

export interface ISettings {
    port: number;
    secret: string;
    database: string;
    host: string;
}
