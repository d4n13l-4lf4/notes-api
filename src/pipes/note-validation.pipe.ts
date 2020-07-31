import { GenericValidationPipe } from './generic-validation.pipe';
import { Note } from '../models/note';
import NotesSchema from '../schema/notes.schema';

export class NoteValidationPipe extends GenericValidationPipe<Note> {
  constructor() {
    super(NotesSchema);
  }
}
