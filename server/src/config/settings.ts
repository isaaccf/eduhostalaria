import { ISettings } from './models';

const isProd = (process.env.NODE_ENV === 'prod');

const settingsProd: ISettings = {
    port: 2000,
    secret: 'secret',
    database: 'reserva',
    host: 'localhost',
};

const settingsDev: ISettings = {
    port: 3000,
    secret: 'secret',
    database: 'reserva',
    host: 'localhost',
};

export const SETTINGS = (isProd) ? settingsProd : settingsDev;
