import { Injectable, Logger } from '@nestjs/common';
import { ConfigService, registerAs } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    debug: process.env.DATABASE_DEBUG,
    url: process.env.DATABASE_URL,
  }),
);

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    const uri = this.configService.get<string>('database.url');
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
