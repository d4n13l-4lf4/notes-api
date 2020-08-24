import { Global, Module } from '@nestjs/common';
import ErrorResponseHandlerService from './service/error-response-handler.service';
import ValidationErrorFactoryChain from './abstract/ValidationErrorFactoryChain';
import { APP_FILTER } from '@nestjs/core';
import { CustomBaseExceptionFilter } from '../filters/custom.base.exception.filter';

@Global()
@Module({
  providers: [
    {
      provide: ErrorResponseHandlerService,
      useFactory: ValidationErrorFactoryChain.build
    },
    {
      provide: APP_FILTER,
      useClass: CustomBaseExceptionFilter
    }
  ],
  exports: [ErrorResponseHandlerService]
})

export class UtilModule {}
