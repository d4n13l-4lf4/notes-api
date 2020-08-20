import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from '../services/notes.service';
import { NotesController } from './notes.controller';
import { getRandomNotes } from '../../../test/data/test.data';
import NotesServiceMock from '../services/__mocks__/notes.service';
import { Note } from '../model/note.schema';

const mockMethod = (method: any, implementation: any) => (method as jest.Mock).mockImplementation(implementation);

describe('Notes controller unit test', () => {
  let app: TestingModule;
  let notesController: NotesController;
  let notesService: NotesService;
  const notes: Partial<Note> = getRandomNotes(2);

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [
        {
          provide: NotesService,
          useClass: NotesServiceMock
        }
      ]})
      .compile();
    notesController = app.get<NotesController>(NotesController);
    notesService = app.get<NotesService>(NotesService);
  });

  describe('Notes controller API test', () => {

    it('get /notes should return an array of notes', (done) => {
      expect.assertions(2);
      const mockedFindAll = jest.fn().mockResolvedValue(notes);
      mockMethod(notesService.findAll, mockedFindAll);
      notesController
        .getNotes()
        .then(notes => {
          expect(mockedFindAll).toBeCalledTimes(1);
          expect(notes).toEqual(notes);
        })
        .catch(e => fail(e))
        .finally(() => done());
    });

    it('get /notes/{noteId} should return the note with a specific id', (done) => {
      expect.assertions(3);
      const mockedFindById = jest.fn().mockResolvedValue(notes[0]);
      mockMethod(notesService.findById, mockedFindById);
      notesController
        .getNote(notes[0].id)
        .then(note => {
          expect(note).toMatchObject(notes[0]);
          expect(mockedFindById).toBeCalledTimes(1);
          expect(mockedFindById).toBeCalledWith(notes[0].id);
        })
        .catch(e => fail(e))
        .finally(() => done());
    });

    it('post /notes should save a note', (done) => {
      expect.assertions(3)
      const mockedSave = jest.fn().mockResolvedValue(notes[0]);
      mockMethod(notesService.save, mockedSave);
      notesController
        .saveNote(notes[0])
        .then(note => {
          expect(note).toMatchObject(notes[0]);
          expect(mockedSave).toBeCalledTimes(1);
          expect(mockedSave).toBeCalledWith(notes[0])
        })
        .catch(e => fail(e))
        .finally(() => done());
    });

    it('delete /notes should delete a note', (done) => {
      expect.assertions(2);
      const mockedDelete = jest.fn().mockResolvedValue(true);
      mockMethod(notesService.deleteById, mockedDelete);
      notesController
        .deleteNote(notes[0].id)
        .then(() => {
          expect(mockedDelete).toBeCalledTimes(1);
          expect(mockedDelete).toBeCalledWith(notes[0].id);
        })
        .catch(e => fail(e))
        .finally(() => done());
    });

    it('delete /notes should throw an error', (done) => {
      expect.assertions(3);
      const mockedFalse = jest.fn().mockResolvedValue(false);
      mockMethod(notesService.deleteById, mockedFalse);
      notesController
        .deleteNote(notes[0].id)
        .catch(e => {
          expect(mockedFalse).toBeCalledTimes(1);
          expect(mockedFalse).toBeCalledWith(notes[0].id)
          expect(e).toMatchObject(expect.objectContaining({message: 'Could not find note to delete!'}))
        })
        .finally(() => done());
    });
  });

  afterAll(async () => {
    await app.close();
  });

});
