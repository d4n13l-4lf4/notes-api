import { GenericValidationPipe } from '../../pipes/generic-validation.pipe';
import NotesSchema from '../validation/schema/notes.schema';
import { NoteInputDto } from '../dto/note-input.dto';

export class NoteValidationPipe extends GenericValidationPipe<NoteInputDto> {
  constructor() {
    super(NotesSchema);
  }
}
