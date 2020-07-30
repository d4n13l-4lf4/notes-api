import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  getNote(@Param('id') id): Note {
    return this.notesService.findById(Number(id));
  }


  @Post()
  saveNote(@Body() note: Note): Note {
    return this.notesService.save(note);
  }

  @Delete(':id')
  deleteNote(@Param('id') id): Note {
    return this.notesService.deleteById(Number(id));
  }
}
