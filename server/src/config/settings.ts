import { ISettings } from './models';

const isProd = process.env.NODE_ENV === 'production';

const settingsProd: ISettings = {
    port: 2000,
    secret: 'secret',
};

const settingsDev: ISettings = {
    port: 3000,
    secret: 'secret',
};

export const SETTINGS = (isProd) ? settingsProd : settingsDev;
