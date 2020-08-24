import ErrorFactory from './ErrorFactory';
import { ApiError } from '../../error/api.error';

export default abstract class ErrorHandler {

  protected next: ErrorHandler | null = null;

  protected constructor(
    private readonly errorFactory: ErrorFactory<any>,
  ) {
  }

  setNext(next: ErrorHandler): void {
    this.next = next;
  }

  public handleRequest(request: any): ApiError {
    if (this.canHandle(request)) {
      return this.errorFactory.createApiError(request);
    }
    return this.next.handleRequest(request);
  }

  protected canHandle(request: any): boolean {
    return request instanceof this.errorFactory.getType();
  }

}
