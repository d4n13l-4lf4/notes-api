import { ErrorType } from './error.type';

export default class CustomError extends global.Error {
  type: ErrorType

  name: 'Api Error' | string;

  constructor(msg: string) {
    super(msg);
  }
}
