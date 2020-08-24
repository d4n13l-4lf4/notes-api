import { ApiError } from '../../error/api.error';

export default interface ErrorFactory<E extends Error> {
  createApiError: (error: E) => ApiError;
  getType: () => new (...args: any[]) => E;
}
