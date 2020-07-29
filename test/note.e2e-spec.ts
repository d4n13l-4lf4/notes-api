import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import assert from 'assert';
import { Note } from '../src/models/Note';
import { NotesService } from '../src/service/notes.service';

describe('Note\'s Controller (e2e)', () => {
  let app: INestApplication;
  const notes: Array<Note> = [
    {id: 1, description: 'Hola'},
    {id: 2, description: 'Bye' }
  ];
  const notesService: NotesService = {
    findAll: () => notes,
    findById: (id) => notes.filter(n => n.id === id)
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    })
      .overrideProvider(NotesService)
      .useValue(notesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notes should return an array of notes', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect(res => res.body = JSON.parse(res.body))
      .expect((res) => {
        assert(res.body, JSON.stringify(notes));
      });
  });

  it('/notes/{id} should return a note with the specific id', () => {
    return request(app.getHttpServer())
      .get('/notes/1')
      .expect(200)
      .expect({
        id: 1,
        description: 'Hola'
      })
  });

  it('/notes/{id} should empty if it does not found note', () => {
    return request(app.getHttpServer())
      .get(`/notes/10`)
      .expect(200)
      .expect((res) => {
        assert(res.body, undefined);
      });
  });
});
