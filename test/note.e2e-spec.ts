import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Note } from '../src/models/note';
import { NotesInMemoryRepositoryService } from '../src/repository/notes-in-memory-repository.service';
import { OAuthTokenResponse } from './util/OAuthTokenResponse';
import authenticate from './util/authentication.util';
import { getRandomNote, getRandomNotes } from './data/test.data';

describe('Note\'s Controller (e2e)', () => {
  let app: INestApplication;
  const notes: Array<Note> = getRandomNotes(2);

  let notesInMemoryRepository: NotesInMemoryRepositoryService;

  let authenticationInfo: OAuthTokenResponse;
  let authenticationHeader: any;

  beforeAll(async () => {
    try {
      authenticationInfo = await authenticate();
      authenticationHeader = {'Authorization': `Bearer ${authenticationInfo.access_token}`};
    } catch (e) {
      fail(e);
    }
  });


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
      .set(authenticationHeader)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(notes);
  });

  it('GET /notes/' + notes[0].id +' should return a note with the specific id', () => {
    return request(app.getHttpServer())
      .get('/notes/' + notes[0].id)
      .expect(200)
      .expect(notes[0])
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
    const noteToPost: Note = getRandomNote();
    return request(app.getHttpServer())
      .post('/notes')
      .send({description: noteToPost.description})
      .expect(201)
      .expect(res => {
        expect(res.body).toEqual(expect.objectContaining({description: noteToPost.description}));
      });
  });

  it('POST /notes with invalid note data should return 400 bad request', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({})
      .expect(400);
  });

  it ('DELETE /notes/' + notes[0].id + ' should return 200 response code the note deleted', () => {
    return request(app.getHttpServer())
      .delete('/notes/' + notes[0].id)
      .expect(200)
      .expect(notes[0]);
  });

  it ('DELETE /notes/asdasd should return 400 bad request', () => {
    return request(app.getHttpServer())
      .delete('/notes/asdasd')
      .expect(400);
  });

});
