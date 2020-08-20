import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controllers/notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import notesSchemas from './model/schemas';

@Module({
  imports: [MongooseModule.forFeature(notesSchemas)],
  controllers: [NotesController],
  providers: [NotesService]
})
export class NotesModule {}
