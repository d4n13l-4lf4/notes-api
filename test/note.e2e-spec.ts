import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Note } from '../src/models/note';
import { NotesInMemoryRepositoryService } from '../src/repository/notes-in-memory-repository.service';

describe('Note\'s Controller (e2e)', () => {
  let app: INestApplication;
  const notes: Array<Note> = [
    {id: 1, description: 'Hola'},
    {id: 2, description: 'Bye' }
  ];

  let notesInMemoryRepository: NotesInMemoryRepositoryService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    notesInMemoryRepository = app.get<NotesInMemoryRepositoryService>(NotesInMemoryRepositoryService);
    notesInMemoryRepository.data = notes;
  });

  it('GET /notes should return an array of notes', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(notes);
  });

  it('GET /notes/1 should return a note with the specific id', () => {
    return request(app.getHttpServer())
      .get('/notes/1')
      .expect(200)
      .expect({
        id: 1,
        description: 'Hola'
      })
  });

  it('GET /notes/10 should be empty if it does not found note', () => {
    return request(app.getHttpServer())
      .get(`/notes/10`)
      .expect(200)
      .expect({});
  });

  it ('GET /notes/asdsad should return 400 bad request', () => {
    return request(app.getHttpServer())
      .get('/notes/asdasd')
      .expect(HttpStatus.BAD_REQUEST)
  });

  it('POST /notes with valid data should return 201 response code with the note added', () => {
    const noteToPost: Note = {
      id: 4,
      description: 'Nota 1'
    };
    return request(app.getHttpServer())
      .post('/notes')
      .send({...noteToPost})
      .expect(201)
      .expect(noteToPost);
  });

  it('POST /notes with invalid note data should return 400 bad request', () => {
    const noteToPost: Note = {
      id: 4,
      description: ''
    };
    return request(app.getHttpServer())
      .post('/notes')
      .send({...noteToPost})
      .expect(400);
  });

  it ('DELETE /notes/1 should return 200 response code the note deleted', () => {
    return request(app.getHttpServer())
      .delete('/notes/1')
      .expect(200)
      .expect(notes[0]);
  });

  it ('DELETE /notes/asdasd should return 400 bad request', () => {
    return request(app.getHttpServer())
      .delete('/notes/asdasd')
      .expect(400);
  });

});
