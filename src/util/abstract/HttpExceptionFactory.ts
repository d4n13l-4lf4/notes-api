import ErrorFactory from './ErrorFactory';
import { HttpException } from '@nestjs/common';
import { ApiError } from '../../error/api.error';

export default class HttpExceptionFactory implements ErrorFactory<HttpException> {
  createApiError(error: HttpException): ApiError {
    let apiError: ApiError = {
      timestamp: new Date().toISOString(),
      message: 'An error ocurred',
      status: error.getStatus(),
    };

    const response = error.getResponse();

    if (typeof response === 'string') {
      apiError = {
        ...apiError,
        message: response as string,
      }
    }

    if (typeof response === 'object') {
      const responseObject = response as Record<string, any>;
      responseObject['statusCode'] = undefined;
      responseObject['error'] = undefined;
      apiError = {
        ...apiError,
        ...responseObject,
      }
    }

    return apiError;
  }

  getType = () => HttpException;

}
