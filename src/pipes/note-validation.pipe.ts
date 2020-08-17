import { GenericValidationPipe } from './generic-validation.pipe';
import { Note } from '../models/note';
import NotesSchema from '../schema/notes.schema';

export class NoteValidationPipe extends GenericValidationPipe<Partial<Note>> {
  constructor() {
    super(NotesSchema);
  }
}
