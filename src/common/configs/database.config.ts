import { Injectable, Logger } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory
} from '@nestjs/mongoose';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    debug: process.env.DATABASE_DEBUG,
    url: process.env.DATABASE_URL,
    development_database: process.env.DEVELOPMENT_DATABASE_NAME,
    production_database: process.env.PRODUCTION_DATABASE_NAME,
    database_options: process.env.DATABASE_OPTIONS,
  })
);

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri =
      this.configService.get<string>('database.url') +
      (this.configService.get<string>('app.env') === 'development'
        ? this.configService.get<string>('database.development_database')
        : this.configService.get<string>('database.production_database')) +
      this.configService.get<string>('database.database_options');
    return {
      uri,
      connectionFactory: (connection) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-paginate-v2'));
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        connection.plugin(require('mongoose-autopopulate'));
        Logger.debug(`App connected to MongoDB at ${uri}`, 'MONGODB');
        return connection;
      },
    };
  }
}
