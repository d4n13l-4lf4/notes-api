import {
  Body,
  Controller,
  Delete,
  Get, HttpCode,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NoteValidationPipe } from '../pipes/note-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { Note } from '../model/note.schema';
import CustomError from '../../error/custom.error';
import { ObjectIdValidationPipe } from '../../pipes/objectId-validation.pipe';

@UseGuards(AuthGuard('jwt'))
@Controller('notes')
export class NotesController {

  constructor(
    private readonly notesService: NotesService) {
  }

  @Get()
  @HttpCode(200)
  getNotes(): Promise<Note[]> {
    return this.notesService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  getNote(@Param('id', ObjectIdValidationPipe) id: string): Promise<Note> {
    return this.notesService.findById(id);
  }


  @Post()
  @UsePipes(NoteValidationPipe)
  @HttpCode(200)
  saveNote(@Body() note: Note): Promise<Note> {
    return this.notesService.save(note);
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteNote(@Param('id', ObjectIdValidationPipe) id: string) {
    const deleted = await this.notesService.deleteById(id);
    if (deleted)
      return;
    throw new CustomError('Could not find note to delete!');
  }
}
