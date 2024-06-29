import {
  utilities as nestWinstonModuleUtilities,
  WinstonModuleOptions
} from 'nest-winston';
import * as winston from 'winston';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        nestWinstonModuleUtilities.format.nestLike()
      )
    })
  ]
};
