import ErrorHandler from './ErrorHandler';
import HttpExceptionFactory from './HttpExceptionFactory';

export default class HttpExceptionHandler extends ErrorHandler {
  constructor() {
    super(new HttpExceptionFactory());
  }
}
