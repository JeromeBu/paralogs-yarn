interface OkParams<T> {
  isSuccess: true;
  value?: T;
}

interface FailParams<T> {
  isSuccess: false;
  error: string;
}

type ConstructorParams<T> = OkParams<T> | FailParams<T>;

// type Monad<A> = {
//   map: <B>(f: (param: A) => B) => Monad<B>;
//   flatMap: <B>(f: (param: A) => Monad<B>) => Monad<B>;
//   mapAsync: <B>(f: (param: A) => Promise<B>) => Promise<Monad<B>>;
//   flatMapAsync: <B>(f: (param: A) => Promise<Monad<B>>) => Promise<Monad<B>>;
// };

export class Result<T> {
  public isSuccess: boolean;
  public error?: string;
  private _value?: T;

  private constructor(params: ConstructorParams<T>) {
    const { isSuccess } = params;
    this.isSuccess = isSuccess;

    if (params.isSuccess) {
      this._value = params.value;
    } else {
      this.error = params.error;
    }

    Object.freeze(this);
  }

  public getOrThrow(): T {
    if (this.error) {
      throw new Error(this.error ?? "Can't retrieve the value from a failed result.");
    }

    return this._value!;
  }

  public getOrElse(f: (error: string) => T): T {
    if (this.error) {
      return f(this.error);
    }
    return this._value!;
  }

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>({ isSuccess: true, value });
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>({ isSuccess: false, error });
  }

  public map<K>(f: (param: T) => K): Result<K> {
    return this.flatMap(param => Result.ok<K>(f(param)));
  }

  public flatMap<K>(f: (param: T) => Result<K>): Result<K> {
    if (this.error) return Result.fail(this.error);
    return f(this.getOrThrow());
  }

  public async mapAsync<K>(f: (param: T) => Promise<K>): Promise<Result<K>> {
    if (this.error) return Result.fail(this.error);
    return Result.ok(await f(this.getOrThrow()));
  }

  public async flatMapAsync<K>(f: (param: T) => Promise<Result<K>>): Promise<Result<K>> {
    if (this.error) return Result.fail(this.error);
    return f(this.getOrThrow());
  }

  public static combine<T extends { [key in string]: Result<unknown> }>(
    resultsObject: T,
  ): Result<{ [K in keyof T]: T[K] extends Result<infer X> ? X : never }> {
    // eslint-disable-next-line
    for (const result of Object.values(resultsObject)) {
      if (result.error) return Result.fail(result.error);
    }

    return Result.ok(
      Object.keys(resultsObject).reduce(
        (acc, key) => ({
          ...acc,
          [key]: resultsObject[key].getOrThrow(),
        }),
        {} as { [K in keyof T]: T[K] extends Result<infer X> ? X : never },
      ),
    );
  }
}
