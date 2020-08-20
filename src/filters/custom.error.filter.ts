import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Response } from '@nestjs/common';
import { ApiError } from '../error/api.error';
import CustomError from '../error/custom.error';

@Catch(CustomError)
export class CustomErrorFilter implements ExceptionFilter {

  catch(exception: CustomError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const apiError: ApiError = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,

    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(apiError);
  }

}
