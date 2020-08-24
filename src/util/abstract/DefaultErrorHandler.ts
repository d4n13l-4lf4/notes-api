import ErrorHandler from './ErrorHandler';
import DefaultErrorFactory from './DefaultErrorFactory';

export default class DefaultErrorHandler extends ErrorHandler {

  constructor() {
    super(new DefaultErrorFactory());
  }
}
