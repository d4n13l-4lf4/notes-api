import { Injectable } from '@nestjs/common';
import { Note } from '../models/Note';

@Injectable()
export class NotesService {

  data: Array<Note>;

  constructor() {
    this.data = [
      {id: 1, description: 'Mi nota 1'},
      {id: 2, description: 'Mi nota 2'}
    ];
  }

  findAll(): Array<Note> {
    return this.data;
  }

  findById(id: string): Note {
    return this.data.filter(n => n.id.toString() === id)[0];
  }


}
