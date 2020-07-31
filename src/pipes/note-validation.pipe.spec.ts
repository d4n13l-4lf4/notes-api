import { Test, TestingModule } from '@nestjs/testing';
import { NoteValidationPipe } from './note-validation.pipe';
import { Note } from '../models/note';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('Note validation pipe unit tes', () => {
  let noteValidationPipe: NoteValidationPipe;
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    noteValidationPipe = app.get<NoteValidationPipe>(NoteValidationPipe);
  });

  describe('Pipe validations', () => {
    it ('should throw bad request exception with invalid note data', () => {
      const invalidNote: Note = {
        id: -1,
        description: ''
      };
      const argumentMetadata: ArgumentMetadata = {
        type: 'body',
      };
      expect(() => noteValidationPipe.transform(invalidNote, argumentMetadata)).toThrow(BadRequestException);
    });

    it ('should return the note to add when valid note data', () => {
      const validNote: Note = {
        id: 2,
        description: 'asd'
      };
      const argumentMetadata: ArgumentMetadata = {
        type: 'body',
      };
      expect(noteValidationPipe.transform(validNote, argumentMetadata)).toBe(validNote);
    });
  });


});
