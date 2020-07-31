import { Test, TestingModule } from '@nestjs/testing';
import { NotesInMemoryRepositoryService } from '../repository/notes-in-memory-repository.service';
import { Note } from '../models/note';

describe('Notes in memory repository service unit test', () => {
  let notesInMemoryService: NotesInMemoryRepositoryService;
  const notes: Array<Note> = [
    {
      id: 1,
      description: 'Mi nota 1'
    },
    {
      id: 2,
      description: 'Mi nota 2'
    }
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [NotesInMemoryRepositoryService],
    }).compile();

    notesInMemoryService = app.get<NotesInMemoryRepositoryService>(NotesInMemoryRepositoryService);
    notesInMemoryService.data = notes;
  });

  describe('Testing the notes service', () => {
    it('should return an array of notes', () => {
      expect(notesInMemoryService.findAll()).toEqual(expect.arrayContaining(notes));
    });

    it('should return a note with the specified id', () => {
      const noteId = 1;
      expect(notesInMemoryService.findById(noteId)).toMatchObject(expect.objectContaining({id: Number(noteId)}))
    });

    it('should save a note', () => {
      const noteToAdd: Note = {
        id: 3,
        description: 'jajaja'
      };
      notesInMemoryService.save(noteToAdd);
      expect(notesInMemoryService.data).toEqual(expect.arrayContaining([ noteToAdd ]));
    });


    it('should delete a note with specific id', () => {
      const noteToDelete = notesInMemoryService.findById(1);
      notesInMemoryService.deleteById(noteToDelete.id);
      expect(notesInMemoryService.data).toEqual(expect.not.arrayContaining([ noteToDelete ]));
    });
  });
});
