import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../service/notes.service';
import { NotesController } from './notes.controller';
import { Note } from '../models/Note';

describe('AppController', () => {
  let notesController: NotesController;
  const notes: Array<Note> = [
    {id: 1, description: 'Hola'},
    {id: 2, description: 'Bye' }
  ];
  const notesService: NotesService = {
    findAll: () => notes,
    findById: (id) => notes.filter(n => n.id === id)[0]
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    })
      .overrideProvider(NotesService)
      .useValue(notesService)
      .compile();

    notesController = app.get<NotesController>(NotesController);
  });

  describe('Notes controller API test', () => {
    it('get /notes should return an array of notes', () => {
      expect(notesController.getNotes()).toBe(notes);
    });

    it('get /notes/{noteId} should return an array of notes', () => {
      const noteId = 1;
      expect(notesController.getNote(noteId)).toBe(notes[0]);
    });
  });

});
