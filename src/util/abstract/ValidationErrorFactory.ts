import ErrorFactory from './ErrorFactory';
import { HttpStatus } from '@nestjs/common';
import { ValidationError } from '@hapi/joi';
import { ApiError } from '../../error/api.error';
import { SourceError } from '../../error/source.error';
import { ErrorType } from '../../error/error.type';

export default class ValidationErrorFactory implements ErrorFactory<ValidationError> {

  createApiError(error: ValidationError): ApiError {
    const errors: SourceError[] = error.details.map(e => ({
      message: e.message,
      type: ErrorType.VALIDATION_ERROR,
      source: `${e.path[0]}`
    }));

    return {
      status: HttpStatus.CONFLICT,
      message: 'Validation error',
      errors,
      timestamp: new Date().toISOString(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getType = () => ValidationError;

}
