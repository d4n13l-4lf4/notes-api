import { ErrorType } from './error.type';

export interface SourceError {
  source: string;
  type: ErrorType;
  message: string;
}
