export class Future<A> {
  private readonly promise: Promise<A>;

  private constructor(promise: Promise<A>) {
    this.promise = promise;
    Object.freeze(this);
  }

  public static fromPromise<T>(t: Promise<T>) {
    return new Future(t);
  }

  public static of<T>(t: T) {
    return new Future(Promise.resolve(t));
  }

  public map<B>(f: (a: A) => B): Future<B> {
    return this.flatMap(a => Future.of(f(a)));
  }

  public flatMap<B>(f: (a: A) => Future<B>): Future<B> {
    return Future.fromPromise(this.promise.then(a => f(a).getPromise()));
  }

  public getPromise() {
    return this.promise;
  }
}
