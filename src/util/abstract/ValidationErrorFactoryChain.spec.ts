import ErrorHandler from './ErrorHandler';
import ValidationErrorFactoryChain from './ValidationErrorFactoryChain';
import NotesSchema from '../../notes/validation/schema/notes.schema';
import { HttpException, InternalServerErrorException } from '@nestjs/common';

describe('Validation error factory chain unit test', () => {
  let errorHandler: ErrorHandler;

  beforeEach(() => {
    errorHandler = ValidationErrorFactoryChain.build();

  });

  it('should return a validation response', () => {
    const { error } = NotesSchema.validate({});
    const apiError = errorHandler.handleRequest(error);
    expect(apiError).toMatchObject(expect.objectContaining({ message: 'Validation error' }));
  });

  it ('should return an api response with the error message inside', () => {
    const error = new Error('Some error');
    const apiError = errorHandler.handleRequest(error);
    expect(apiError).toMatchObject(expect.objectContaining({ message: error.message }));
  });

  it ('should return an api response with 500 status code', () => {
    const internalError = new InternalServerErrorException('Some error', '');
    jest.spyOn(internalError, 'getResponse').mockImplementationOnce(() => internalError.message);
    const apiError = errorHandler.handleRequest(internalError);
    expect(internalError.getResponse).toBeCalled();
    expect(apiError).toMatchObject(expect.objectContaining({ status: internalError.getStatus(), message: internalError.message}))
  });

  it ('should return an api response with 500 status code when an exception is throw with an object', () => {
    const internalError = new InternalServerErrorException('');
    const message = 'Hi!';
    jest.spyOn(internalError, 'getResponse').mockImplementationOnce(() => ({
      someMessage: message
    }));
    const apiError = errorHandler.handleRequest(internalError);
    expect(internalError.getResponse).toBeCalled();
    expect(apiError).toMatchObject(expect.objectContaining({ someMessage: message, status: internalError.getStatus() }))
  });
});
