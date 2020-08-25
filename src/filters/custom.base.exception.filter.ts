import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, Inject, LoggerService } from '@nestjs/common';
import { Request, Response } from 'express';
import ErrorResponseHandlerService from '../util/service/error-response-handler.service';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

const getFromRequest = (request: Request) => {
  const context = {
    method: request.method,
    path: request.path,
    params: request.params,
    body: request.body,
  };
  return JSON.stringify(context);
}

@Catch()
export class CustomBaseExceptionFilter extends BaseExceptionFilter {

  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly errorMessageCreator: ErrorResponseHandlerService
  ) {
    super();
  }

  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const apiError = this.errorMessageCreator.handleRequest(exception);
    this.logger.error(exception.message, exception.stack, getFromRequest(request));
    response
      .status(apiError.status)
      .json(apiError);
  }

}
