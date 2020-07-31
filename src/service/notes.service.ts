import { Injectable } from '@nestjs/common';
import { Note } from '../models/note';
import { NotesInMemoryRepositoryService } from '../repository/notes-in-memory-repository.service';

@Injectable()
export class NotesService {


  constructor(private readonly notesRepository: NotesInMemoryRepositoryService) {
  }

  findAll(): Array<Note> {
    return this.notesRepository.findAll();
  }

  findById(id: number): Note {
    return this.notesRepository.findById(id);
  }


  deleteById(id: number): Note {
    return this.notesRepository.deleteById(id);
  }

  save(note: Note): Note {
    if (this.findById(note.id))
      return;

    return this.notesRepository.save(note);
  }
}
