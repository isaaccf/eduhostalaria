export interface ISettings {
    port: number;
    secret: string;
    database: string;
    host: string;
    mailerSettings: IMailerSettings;

}

export interface IMailerSettings {
    service?: string;
    port?: number;
    host?: string;
    auth: object;
    secure: boolean;
    ignoreTLS?: boolean;
    requireTLS?: boolean;
}