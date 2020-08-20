import { Module } from '@nestjs/common';
import { Auth0Module } from './auth0/auth0.module';
import { NotesModule } from './notes/notes.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configOptions from './config/config.options';
import MongooseConfigService from './service/mongoose.config.service';

@Module({
  imports: [
    Auth0Module,
    ConfigModule.forRoot(configOptions),
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService
    }),
    NotesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
