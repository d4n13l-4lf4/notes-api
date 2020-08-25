import { Module } from '@nestjs/common';
import { Auth0Module } from './auth0/auth0.module';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configOptions from './config/config.options';
import MongooseConfigService from './service/mongoose.config.service';
import { WinstonModule } from 'nest-winston';
import { UtilModule } from './util/util.module';
import WinstonConfigService from './service/winston.config.service';
import loggerConfig from './config/logger.config';

@Module({
  imports: [
    Auth0Module,
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    WinstonModule.forRootAsync({
      imports: [ConfigModule.forFeature(loggerConfig)],
      useClass: WinstonConfigService,
    }),
    NotesModule,
    UtilModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
