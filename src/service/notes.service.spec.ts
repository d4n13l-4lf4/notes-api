import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';

describe('Notes service unit test', () => {
  let notesService: NotesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    notesService = app.get<NotesService>(NotesService);
  });

  describe('Testing the notes service', () => {
    it('should return an array of notes', () => {
      expect(notesService.findAll()).toBeTruthy();
    });

    it('should return a note with the specified id', () => {
      const noteId = '1';
      expect(notesService.findById(noteId)).toBeTruthy();
    });
  });
});
