import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './service/notes.service';
import { NotesInMemoryRepositoryService } from './repository/notes-in-memory-repository.service';

@Module({
  imports: [],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService, NotesInMemoryRepositoryService],
})
export class AppModule {}
