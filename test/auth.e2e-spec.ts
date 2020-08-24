import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import request from 'supertest';
import authenticate from './util/authentication.util';
import { OAuthTokenResponse } from './util/OAuthTokenResponse';

describe('Authentication test', () => {

  let app: INestApplication;

  beforeAll(async () => {
    try {
      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule]
      })
        .compile();

      app = await moduleFixture.createNestApplication();
      await app.init();
    } catch (e) {
      fail(e);
    }
  });

  it('GET /notes should return 401 unauthorized when an unauthorized request is sent', () => {
    request(app.getHttpServer())
      .get('/notes')
      .expect(HttpStatus.UNAUTHORIZED)
  });

  it('GET /notes should return 200 OK when an authorized request is sent', async () => {
    try {
      const authentication: OAuthTokenResponse = await authenticate();
      request(app.getHttpServer())
        .get('/notes')
        .set({ Authorization: `Bearer ${authentication.access_token}`})
        .expect(HttpStatus.OK)
    } catch(e) {
      fail(e);
    }
  });

  afterAll(async () => {
   await app.close();
  });

});
