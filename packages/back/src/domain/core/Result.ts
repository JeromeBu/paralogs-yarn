interface OkParams<T> {
  isSuccess: true;
  value?: T;
}

interface FailParams<T> {
  isSuccess: false;
  error: string;
}

type ConstructorParams<T> = OkParams<T> | FailParams<T>;

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

  public static ok<U>(value?: U): Result<U> {
    return new Result<U>({ isSuccess: true, value });
  }

  public static fail<U>(error: string): Result<U> {
    return new Result<U>({ isSuccess: false, error });
  }

  public flatMap<K>(f: (param: T) => Result<K>): Result<K> {
    if (this.error) return Result.fail<K>(this.error);
    return f(this.getOrThrow());
  }

  public map<K>(f: (param: T) => K): Result<K> {
    return this.flatMap(param => Result.ok<K>(f(param)));
  }

  public static combine<T extends { [key in string]: Result<unknown> }, S>(
    results: T,
    cb: (resultsInCb: { [K in keyof T]: T[K] extends Result<infer X> ? X : never }) => S,
  ): Result<S> {
    const resultValues = Object.values(results);
    // eslint-disable-next-line
    for (const result of resultValues) {
      if (result.error) return Result.fail<S>(result.error);
    }

    const resultKeys = Object.keys(results);
    return Result.ok(
      cb(
        resultKeys.reduce(
          (acc, key) => ({
            ...acc,
            [key]: results[key].getOrThrow(),
          }),
          {} as { [K in keyof T]: T[K] extends Result<infer X> ? X : never },
        ),
      ),
    );
  }
}
