import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Response } from '@nestjs/common';
import { ApiError } from '../error/api.error';
import { ErrorType } from '../error/error.type';
import { Error } from 'mongoose';

@Catch(Error)
export class MongooseErrorFilter implements ExceptionFilter {

  catch(exception: Error, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const apiError: ApiError = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Persistance error',
      errors: [{
        source: exception.name,
        type: ErrorType.PERSISTENCE_ERROR,
        message: exception.message
      }]};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(apiError);
  }

}
