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

  public getValueOrThrow(): T {
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

  public static combine(results: Result<any>[]): Result<any> {
    // eslint-disable-next-line
    for (let result of results) {
      if (!result.isSuccess) return result;
    }
    return Result.ok<any>();
  }
}
