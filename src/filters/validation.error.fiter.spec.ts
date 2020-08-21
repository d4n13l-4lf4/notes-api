import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ValidationErrorFilter } from './validation.error.filter';
import NotesSchema from '../notes/validation/schema/notes.schema';
import mockedExecution, { mockedJsonResponse } from '../../test/__mocks__/arguments.host.mock';

describe('Validation error filter test', () => {

  let app: TestingModule;
  let validationErrorFilter: ValidationErrorFilter;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    validationErrorFilter = app.get<ValidationErrorFilter>(ValidationErrorFilter);
  });

  beforeEach(() => {
    mockedJsonResponse.mockClear();
  });

  it('should return a response with a validation error messaage', () => {
    expect.assertions(2);
    const { error } = NotesSchema.validate({});
    const mockedResponse = (mockedExecution.switchToHttp().getResponse().json).mockReturnValue({ message: error.message });
    const response = validationErrorFilter.catch(error, mockedExecution);
    expect(mockedResponse).toBeCalledTimes(1);
    expect(response).toMatchObject(expect.objectContaining({message: error.message}));
  });

  afterAll(async () => {
    await app.close();
  });


});
