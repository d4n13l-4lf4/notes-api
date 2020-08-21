import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import mockedExecution from '../../test/__mocks__/arguments.host.mock';
import { MongooseErrorFilter } from './mongoose.error.filter';
import { Error } from 'mongoose';

describe('Mongoose error filter test', () => {

  let app: TestingModule;
  let mongooseErrorFilter: MongooseErrorFilter;
  const error = new Error('My error');

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    mongooseErrorFilter = app.get<MongooseErrorFilter>(MongooseErrorFilter);
  });

  it('should return a response with a mongoose error message', () => {
    expect.assertions(2);
    const mockedResponse = (mockedExecution.switchToHttp().getResponse().json).mockReturnValue({ message: error.message });
    const response = mongooseErrorFilter.catch(error, mockedExecution);
    expect(mockedResponse).toBeCalledTimes(1);
    expect(response).toMatchObject(expect.objectContaining({message: error.message }));
  });

  afterAll(async () => {
    await app.close();
  });


});
