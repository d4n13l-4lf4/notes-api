import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './service/notes.service';

@Module({
  imports: [],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
