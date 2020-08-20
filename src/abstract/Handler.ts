abstract class Handler<T> {
  protected next: Handler<T> | null = null;

  public setNext(next: Handler<T>): void {
    this.next = next
  }

  public handleRequest(request: T): void {
    if (this.canHandle(request)) {
      this.next !== null ? this.next.canHandle(request) : '';
    }
  }

  protected abstract canHandle(request: T): boolean;

}
