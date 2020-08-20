import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Response } from '@nestjs/common';
import { ValidationError } from '@hapi/joi';
import { ApiError } from '../error/api.error';
import { SourceError } from '../error/source.error';
import { ErrorType } from '../error/error.type';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {

  catch(exception: ValidationError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errors: SourceError[] = exception.details.map(e => ({
      message: e.message,
      type: ErrorType.VALIDATION_ERROR,
      source: `${e.path[0]}`
    }));
    const apiError: ApiError = {
      status: HttpStatus.CONFLICT,
      message: 'Validation error',
      errors
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.status(HttpStatus.CONFLICT).json(apiError);
  }

}
