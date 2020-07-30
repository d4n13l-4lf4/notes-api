import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { NotesInMemoryRepositoryService } from '../repository/notes-in-memory-repository.service';
import { Note } from '../models/Note';

describe('Notes service unit test', () => {
  let notesService: NotesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [NotesService, NotesInMemoryRepositoryService],
    }).compile();

    notesService = app.get<NotesService>(NotesService);
  });

  describe('Testing the notes service', () => {
    it('should return an array of notes', () => {
      expect(notesService.findAll()).toBeTruthy();
    });

    it('should return a note with the specified id', () => {
      const note: Note = {
        id: 1,
        description: 'Nota 1'
      };
      notesService.save(note);
      expect(notesService.findById(note.id)).toMatchObject(expect.objectContaining({id: note.id}))
    });

    it ('should save a note', () => {

    });

    it ('should not save a duplicated note comparing by ID', () => {
      const noteToAdd: Note = {
        id: 1,
        description: 'Mi nota 1'
      };
      notesService.save(noteToAdd);
      notesService.save(noteToAdd);
      expect(notesService.findAll().length).toBe(1);
    });

    it ('should delete a note with specific id', () => {
      const noteToDelete: Note = {
        id: 1,
        description: 'Nota a borrar'
      };
      notesService.save(noteToDelete);
      notesService.deleteById(noteToDelete.id);
      expect(notesService.findAll()).toEqual(expect.not.arrayContaining([noteToDelete]));
    });
  });
});
