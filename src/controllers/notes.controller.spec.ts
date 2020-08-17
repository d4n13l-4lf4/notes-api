import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../service/notes.service';
import { NotesController } from './notes.controller';
import { Note } from '../models/note';
import { NotesInMemoryRepositoryService } from '../repository/notes-in-memory-repository.service';

describe('Notes controller unit test', () => {
  let notesController: NotesController;
  const notes: Array<Note> = [
    {id: 1, description: 'Hola'},
    {id: 2, description: 'Bye' }
  ];

  let notesInMemoryRepository: NotesInMemoryRepositoryService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        NotesService,
        NotesInMemoryRepositoryService,
      ]})
      .compile();

    notesController = app.get<NotesController>(NotesController);
    notesInMemoryRepository = app.get<NotesInMemoryRepositoryService>(NotesInMemoryRepositoryService);
    notesInMemoryRepository.data = notes;
  });

  describe('Notes controller API test', () => {
    it('get /notes should return an array of notes', () => {
      expect(notesController.getNotes()).toBe(notes);
    });

    it('get /notes/{noteId} should return the note with the specified id', () => {
      const noteId = 1;
      expect(notesController.getNote(noteId)).toBe(notes[0]);
    });


    it('post /notes should save a note', () => {
      const noteToSave: Note = {
        id: 3,
        description: 'jajaja'
      };
      notesController.saveNote(noteToSave)
      expect(notesController.getNotes().length).toBe(3);
    });

    it ('post /notes should not save a duplicated note comparing ID', () => {
      const noteToSave: Note = {
        id: 3,
        description: 'jajaja'
      };
      notesController.saveNote(noteToSave);
      notesController.saveNote(noteToSave);
      expect(notesController.getNotes().length).toBe(3);
    });

    it('delete /notes should delete a note', () => {
      const noteToSave: Note = {
        id: 3,
        description: 'jajaja'
      };
      notesController.saveNote(noteToSave)
      notesController.deleteNote(noteToSave.id);
      expect(notesController.getNote(noteToSave.id)).toBe(undefined);
    });

  });

});
