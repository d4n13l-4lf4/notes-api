import { Controller, Get, Param } from '@nestjs/common';
import { NotesService } from '../service/notes.service';
import { Note } from '../models/Note';



@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {
  }


  @Get()
  getNotes(): Array<Note> {
    return this.notesService.findAll();
  }

  @Get(':id')
  getNote(@Param('id') noteId): Note {
    return this.notesService.findById(noteId);
  }
}
