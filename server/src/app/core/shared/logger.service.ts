import { Component } from 'nest.js';
import { Logger, LoggerInstance, transports } from 'winston';

@Component()
export class LoggerService {
    private _logger: LoggerInstance;

    public get logger() {
        if (this._logger) {
            return this._logger;
        }

        this._logger = new Logger({
            transports: [
                new (transports.Console)(),
                /*new (transports.File)({ filename: 'somefile.log' })*/
            ],
        });

        return this._logger;
    }

}
