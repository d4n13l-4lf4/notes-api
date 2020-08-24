import ErrorFactory from './ErrorFactory';
import { HttpStatus } from '@nestjs/common';
import { ApiError } from '../../error/api.error';

export default class DefaultErrorFactory implements ErrorFactory<Error> {

  createApiError(error: Error): ApiError {
    return {
      message: error.message,
      status: HttpStatus.CONFLICT,
      timestamp: new Date().toISOString(),
    };
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  getType = () => Error;

}
