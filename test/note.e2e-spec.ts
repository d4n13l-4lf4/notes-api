import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { OAuthTokenResponse } from './util/OAuthTokenResponse';
import authenticate from './util/authentication.util';
import { getRandomNote } from './data/test.data';
import { Note as NoteDB } from '../src/notes/model/note.schema';
import { Note } from '../src/models/note';

const postNote = (httpServer, authenticationHeader) => {
  return new Promise<NoteDB>((resolve, reject) => {
    request(httpServer)
      .post('/notes')
      .set(authenticationHeader)
      .send({description: getRandomNote().description})
      .expect(HttpStatus.OK)
      .end(((err, res) => {
        if (err)
          return reject(err);
        return resolve(res.body);
      }));
  })
};

describe("Notes controller e2e testing", () => {
  let app: INestApplication;

  let authenticationInfo: OAuthTokenResponse;
  let authenticationHeader: any;

  beforeAll(async (done) => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
      })
        .compile();
      app = moduleFixture.createNestApplication();
      app = await app.init();
      authenticationInfo = await authenticate();
      authenticationHeader = { 'Authorization': `Bearer ${authenticationInfo.access_token}` };
      done();
    } catch (e) {
      fail(e);
    }
  });

  it('POST /notes with valid data should return 200 response code with the note added', () => {
    const noteToPost: Note = getRandomNote();
    return request(app.getHttpServer())
      .post('/notes')
      .set(authenticationHeader)
      .send({description: noteToPost.description})
      .expect(HttpStatus.OK)
      .expect(res => {
        expect(res.body).toEqual(expect.objectContaining({description: noteToPost.description}));
      });
  });

  it('POST /notes with invalid note data should return 409 conflict', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .set(authenticationHeader)
      .send({})
      .expect(HttpStatus.CONFLICT);
  });

  it('GET /notes should return an array', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .set(authenticationHeader)
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).toBeInstanceOf(Array);
      })
  });

  it('GET /notes/ should return a note with the specific id', async () => {
    const postedNote = await postNote(app.getHttpServer(), authenticationHeader);
    return request(app.getHttpServer())
      .get('/notes/' + postedNote._id)
      .set(authenticationHeader)
      .expect(HttpStatus.OK)
      .expect(postedNote as NoteDB);
  });

  it('GET /notes/10 should return 400 status code', () => {
    return request(app.getHttpServer())
      .get(`/notes/10`)
      .set(authenticationHeader)
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('GET /notes/asdsad should return 400 status code', () => {
    return request(app.getHttpServer())
      .get('/notes/asdasd')
      .set(authenticationHeader)
      .expect(HttpStatus.BAD_REQUEST)
  });


  it ('DELETE /notes/ should return 200 status code', async () => {
    const notePosted = await postNote(app.getHttpServer(), authenticationHeader);
    return request(app.getHttpServer())
      .delete('/notes/' + notePosted._id)
      .set(authenticationHeader)
      .expect(HttpStatus.OK);
  });

  it ('DELETE /notes/asdasd should return 400 bad request', () => {
    return request(app.getHttpServer())
      .delete('/notes/asdasd')
      .set(authenticationHeader)
      .expect(HttpStatus.BAD_REQUEST);
  });


  afterAll(async (done) => {
    await app.close();
    done();
  })
});
