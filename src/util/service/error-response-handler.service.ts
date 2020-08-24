import { Injectable } from '@nestjs/common';
import ErrorHandler from '../abstract/ErrorHandler';


@Injectable()
export default class ErrorResponseHandlerService extends ErrorHandler {

}
