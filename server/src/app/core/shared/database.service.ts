import { Component, Logger } from '@nestjs/common';
import { join } from 'path';
import { Connection, createConnection, Entity, EntityManager, Repository } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { SETTINGS } from './../../../config/settings';

@Component()
export class DatabaseService {
    private _connection: Connection;
    private logger: Logger;

    constructor() {
        this.logger = new Logger('Database Service');
    }

    private get connection(): Promise<Connection> {
        if (this._connection) {
            return Promise.resolve(this._connection);
        }

        return createConnection({
            driver: {
                database: SETTINGS.database,
                host: SETTINGS.host,
                type: 'mongodb',
            },
            entities: [
                // any entity file under src/modules
                join(__dirname + '/../../../app/**/*.entity.ts'),
            ],
            logging: {
                logQueries: true,
                logSchemaCreation: true,
            },
        }).then(connection => {
            this.logger.log(`Connected to mongo database ${SETTINGS.database}.`);
            this._connection = connection;
            return connection;
        }).catch(error => {
            throw error;
        });
    }

    public async getEntityManager(): Promise<EntityManager> {
        return (await this.connection).entityManager;
    }

    public async getRepository<T>(entityClassOrName: ObjectType<T> | string): Promise<Repository<T>> {
        return (await this.connection).getRepository<T>(entityClassOrName);
    }
}