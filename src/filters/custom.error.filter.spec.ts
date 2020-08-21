import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import mockedExecution from '../../test/__mocks__/arguments.host.mock';
import { CustomErrorFilter } from './custom.error.filter';
import CustomError from '../error/custom.error';

describe('Custom error filter test', () => {

  let app: TestingModule;
  let customErrorFilter: CustomErrorFilter;
  const error = new CustomError('My error');

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    customErrorFilter = app.get<CustomErrorFilter>(CustomErrorFilter);
  });

  it('should return a response with an error filter message', () => {
    expect.assertions(2);
    const mockedResponse = (mockedExecution.switchToHttp().getResponse().json).mockReturnValue({ message: error.message });
    const response = customErrorFilter.catch(error, mockedExecution);
    expect(mockedResponse).toBeCalledTimes(1);
    expect(response).toMatchObject(expect.objectContaining({message: error.message }));
  });

  afterAll(async () => {
    await app.close();
  });


});
