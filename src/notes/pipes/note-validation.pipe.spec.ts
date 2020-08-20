import { Test, TestingModule } from '@nestjs/testing';
import { NoteValidationPipe } from './note-validation.pipe';
import { ArgumentMetadata } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { NoteInputDto } from '../dto/note-input.dto';
import { ValidationError } from '@hapi/joi';

describe('Note validation pipe unit test', () => {
  let noteValidationPipe: NoteValidationPipe;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    noteValidationPipe = app.get<NoteValidationPipe>(NoteValidationPipe);
  });

  it ('should throw bad request exception with invalid note data', () => {
    const invalidNote: NoteInputDto = {
      description: ''
    };
    const argumentMetadata: ArgumentMetadata = {
      type: 'body',
    };
    expect(() => noteValidationPipe.transform(invalidNote, argumentMetadata)).toThrow(ValidationError);
  });

  it ('should return the note to add when valid note data', () => {
    const validNote: NoteInputDto = {
      description: 'asd'
    };
    const argumentMetadata: ArgumentMetadata = {
      type: 'body',
    };
    expect(noteValidationPipe.transform(validNote, argumentMetadata)).toBe(validNote);
  });

  afterAll(async () => {
    await app.close();
  });

});
