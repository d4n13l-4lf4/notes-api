import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes } from '@nestjs/common';
import { NotesService } from '../service/notes.service';
import { Note } from '../models/note';
import { NoteValidationPipe } from '../pipes/note-validation.pipe';



@Controller('notes')
export class NotesController {

  constructor(private readonly notesService: NotesService) {
  }


  @Get()
  getNotes(): Array<Note> {
    return this.notesService.findAll();
  }

  @Get(':id')
  getNote(@Param('id', new ParseIntPipe()) id): Note {
    return this.notesService.findById(Number(id));
  }


  @Post()
  @UsePipes(NoteValidationPipe)
  saveNote(@Body() note: Note): Note {
    return this.notesService.save(note);
  }

  @Delete(':id')
  deleteNote(@Param('id', new ParseIntPipe()) id): Note {
    return this.notesService.deleteById(Number(id));
  }
}
