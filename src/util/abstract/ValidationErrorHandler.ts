import ErrorHandler from './ErrorHandler';
import ValidationErrorFactory from './ValidationErrorFactory';

export default class ValidationErrorHandler extends ErrorHandler {

  constructor() {
    super(new ValidationErrorFactory());
  }
}
