import ErrorHandler from './ErrorHandler';
import ValidationErrorHandler from './ValidationErrorHandler';
import DefaultErrorHandler from './DefaultErrorHandler';
import HttpExceptionHandler from './HttpExceptionHandler';

class ValidationErrorFactoryChain {

  static build(): ErrorHandler {
    const validationErrorHandler = new ValidationErrorHandler();
    const defaultErrorHandler = new DefaultErrorHandler();
    const httpExceptionHandler = new HttpExceptionHandler();
    httpExceptionHandler.setNext(validationErrorHandler);
    validationErrorHandler.setNext(defaultErrorHandler);
    return httpExceptionHandler;
  }

}

export default ValidationErrorFactoryChain;
