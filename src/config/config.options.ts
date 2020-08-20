import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';
import authenticationConfig from './authentication.config';
import databaseConfig from './database.config';

const configOptions: ConfigModuleOptions = {
  encoding: 'utf-8',
  expandVariables: true,
  isGlobal: true,
  load: [ authenticationConfig, databaseConfig ],
}

export default configOptions;
