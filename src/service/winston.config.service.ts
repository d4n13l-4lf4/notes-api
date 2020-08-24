import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';
import { Inject, Injectable } from '@nestjs/common';
import winston from 'winston';
import LogzioWinstonTransport from 'winston-logzio';
import loggerConfig from '../config/logger.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export default class WinstonConfigService implements WinstonModuleOptionsFactory {

  private logzioTransport: LogzioWinstonTransport;

  constructor(@Inject(loggerConfig.KEY)
              private readonly loggerConfiguration: ConfigType<typeof loggerConfig>) {
    this.logzioTransport = new LogzioWinstonTransport({
      level: loggerConfiguration.level,
      token: loggerConfiguration.token,
      host: loggerConfiguration.listener_host,
      compress: true,
    });
  }

  createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
    return {
      transports: [
        new winston.transports.Console({
          level: this.loggerConfiguration.level,
          format: winston.format.combine(
            winston.format.prettyPrint(),
            winston.format.timestamp(),
            winston.format.colorize({ all: true }),
          )
        }),
        this.logzioTransport
      ],
      exceptionHandlers: [
        this.logzioTransport
      ]
    };
  }

}
