import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from './common/logger/logger.module';
import configs from './common/configs';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import { MongooseConfigService } from './common/configs/database.config';
import { UserModule } from './modules/user/user.module';
import { ImageModule } from './modules/image/image.module';
import { DebuggerModule } from './common/debugger/debugger.module';
import * as winston from 'winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: ['.env'],
      expandVariables: true,
    }),
    WinstonModule.forRootAsync({
      imports: [DebuggerModule],
      useFactory: (logger: winston.LoggerOptions) => ({
        transports: [
          new winston.transports.Console({
            level: logger.level,
            format: winston.format.combine(
              winston.format.timestamp(),
              winston.format.prettyPrint(),
              nestWinstonModuleUtilities.format.nestLike(),
            ),
          }),
        ],
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),
    LoggerModule,
    UserModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
