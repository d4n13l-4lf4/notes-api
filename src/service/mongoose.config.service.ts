import { MongooseModuleOptions, MongooseOptionsFactory } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import databaseOptions from '../config/database.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export default class MongooseConfigService implements MongooseOptionsFactory {

  constructor(@Inject(databaseOptions.KEY)
              private readonly databaseConfig: ConfigType<typeof databaseOptions>
  ) {
  }

  createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
    return {
      uri: this.databaseConfig.uri,
      user: this.databaseConfig.user,
      pass: this.databaseConfig.password,
      authSource: this.databaseConfig.authSource,
      useNewUrlParser: true,
    };
  }

}
