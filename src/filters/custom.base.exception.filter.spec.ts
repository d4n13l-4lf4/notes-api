import { CustomBaseExceptionFilter } from './custom.base.exception.filter';
import { Test, TestingModule } from '@nestjs/testing';
import mockedExecution, { mockedJsonResponse } from '../../test/__mocks__/arguments.host.mock';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import ErrorResponseHandlerService from '../util/service/error-response-handler.service';
import { ApiError } from '../error/api.error';
import { HttpStatus } from '@nestjs/common';
import ValidationErrorFactoryChain from '../util/abstract/ValidationErrorFactoryChain';

describe('Custom base exception filter unit test', () => {
  let customBaseExceptionFilter: CustomBaseExceptionFilter;
  let errorResponseHandlerService: ErrorResponseHandlerService;
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        {
          provide: WINSTON_MODULE_NEST_PROVIDER,
          useValue: {
            error: jest.fn()
          },
        },
        {
          provide: ErrorResponseHandlerService,
          useFactory: ValidationErrorFactoryChain.build
        },
        {
          provide: CustomBaseExceptionFilter,
          useClass: CustomBaseExceptionFilter
        }]
    })
      .compile();
    customBaseExceptionFilter = app.get(CustomBaseExceptionFilter);
    errorResponseHandlerService = app.get(ErrorResponseHandlerService);
  });

  it ('should call response with a message', () => {
    const error = new Error('Some fucking error');
    const apiResponse: ApiError = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: error.message,
      timestamp: new Date().toISOString()
    };
    jest.spyOn(errorResponseHandlerService, 'handleRequest').mockReturnValue(apiResponse);
    customBaseExceptionFilter.catch(error, mockedExecution);
    expect(mockedJsonResponse).toBeCalledTimes(1);
    expect(mockedJsonResponse).toBeCalledWith(expect.objectContaining({...apiResponse}));
  });

  afterAll(async () => {
    await app.close()
  });
});
