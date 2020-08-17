import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './service/notes.service';
import { NotesInMemoryRepositoryService } from './repository/notes-in-memory-repository.service';
import { Auth0Module } from './auth0/auth0.module';

@Module({
  imports: [Auth0Module],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService, NotesInMemoryRepositoryService],
})
export class AppModule {}
