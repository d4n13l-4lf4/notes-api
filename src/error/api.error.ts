import { SourceError } from './source.error';
import { BaseError } from './base.error';

export interface ApiError extends BaseError{
  errors?: SourceError[]
}
