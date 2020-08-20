import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Note } from '../model/note.schema';
import { getRandomNote } from '../../../test/data/test.data';
import { Model } from 'mongoose';

const mockedNotesModel = jest.fn().mockImplementation(function() {
  return  {
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockImplementation(() => Promise.resolve([]))
    }),
    findById: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn()
  }
});


describe('Notes service unit test', () => {
  let app: TestingModule;
  let notesService: NotesService;
  let notesModel: Model<Note>;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [NotesService, {
        provide: getModelToken(Note.name),
        useValue: new mockedNotesModel()
      }],
    }).compile();

    notesService = app.get<NotesService>(NotesService);
    notesModel = app.get<Model<Note>>(getModelToken(Note.name));
  });

  describe('Testing the notes service with successfully calls', () => {

    it('should return an array of notes', (done) => {
      const mockedFind = jest.fn().mockReturnValue({
        exec: jest.fn().mockImplementation(() => Promise.resolve([]))
      });
      (notesModel.find as jest.Mock).mockImplementationOnce(mockedFind);
      notesService.findAll()
        .then(notes => {
          expect(mockedFind).toBeCalledTimes(1);
          expect(notes).toEqual([])
        })
        .catch((e) => fail(e))
        .finally(() => done());
    });

    it('should return a note with the specified id', (done) => {
      const note: Partial<Note> = getRandomNote();
      note._id = '1';
      const mockedFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockImplementation(() => Promise.resolve(note))
      });
      (notesModel.findById as jest.Mock).mockImplementationOnce(mockedFindById);
      notesService.findById(note._id)
        .then(note => {
          expect(mockedFindById).toBeCalledTimes(1);
          expect(note).toMatchObject(expect.objectContaining({_id: note._id}));
        })
        .catch(e => fail(e))
        .finally(() => done())
    });

    it('should save a note', (done) => {
      const noteCreated: Partial<Note> = getRandomNote();
      const mockedCreate = jest.fn().mockResolvedValue(noteCreated);
      (notesModel.create as jest.Mock).mockImplementationOnce(mockedCreate);
      notesService.save({ description: noteCreated.description })
        .then(note => {
          expect(note).toMatchObject(expect.objectContaining({description: noteCreated.description}));
          expect(mockedCreate).toBeCalledTimes(1);
        })
        .catch(e => fail(e))
        .finally(() => done());
    });


    it('should delete a note with specific id', (done) => {
      const mockedDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockImplementation(() => Promise.resolve({ok: 1, deletedCount: 1}))
      });
      (notesModel.deleteOne as jest.Mock).mockImplementation(mockedDelete);
      notesService.deleteById('1')
        .then((deleted) => {
          expect(mockedDelete).toBeCalledTimes(1);
          expect(deleted).toBeTruthy();
        })
        .catch(e => fail(e))
        .finally(() => done());
    });
  });

  describe('Testing the notes service with failed calls',  () => {
    const error = new Error('Some error');

    it('should throw an error while retrieving notes', (done) => {
      expect.assertions(2);
      const mockedFailFind = jest.fn().mockReturnValue({
        exec: jest.fn().mockImplementation(() => Promise.reject(error))
      });
      (notesModel.find as jest.Mock).mockImplementationOnce(mockedFailFind);
      notesService.findAll()
        .catch(e => {
          expect(e).toMatchObject(error);
          expect(mockedFailFind).toBeCalledTimes(1)
        })
        .finally(() => done());
    });

    it('should throw an error while retrieving a note with a specific ID', (done) => {
      expect.assertions(2);
      const note: Partial<Note> = getRandomNote();
      note._id = '1';
      const mockedFindById = jest.fn().mockReturnValue({
        exec: jest.fn().mockImplementation(() => Promise.reject(error))
      });
      (notesModel.findById as jest.Mock).mockImplementationOnce(mockedFindById);
      notesService.findById(note._id)
        .catch(e => {
          expect(e).toMatchObject(error);
          expect(mockedFindById).toBeCalledTimes(1);
        })
        .finally(() => done())
    });

    it('should throw an error while saving a note', (done) => {
      expect.assertions(2);
      const noteCreated: Partial<Note> = getRandomNote();
      const mockerErrorCreate = jest.fn().mockRejectedValue(error);
      (notesModel.create as jest.Mock).mockImplementationOnce(mockerErrorCreate);
      notesService.save({ description: noteCreated.description })
        .catch(e => {
          expect(e).toMatchObject(error);
          expect(mockerErrorCreate).toBeCalledTimes(1);
        })
        .finally(() => done());
    });


    it('should throw an error while removing a note with specific id', (done) => {
      expect.assertions(2);
      const mockedErrorDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockImplementation(() => Promise.reject(error))
      });
      (notesModel.deleteOne as jest.Mock).mockImplementation(mockedErrorDelete);
      notesService.deleteById('1')
        .catch((e) => {
          expect(mockedErrorDelete).toBeCalledTimes(1);
          expect(e).toMatchObject(e);
        })
        .finally(() => done());
    });
  });

  afterAll(async () => {
    await app.close();
  })
});
