import { ApiError } from './api.error';

export default class CustomError extends global.Error implements ApiError {

  name: 'Api Error' | string;

  constructor(msg: string) {
    super(msg);
  }

  status: number;
  timestamp: string;
}
