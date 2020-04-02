interface ConstructorParams<A> {
  value: A;
  isNone: boolean;
}

export class Option<A> {
  private readonly value: A;
  private readonly _isNone: boolean;

  private constructor({ value, isNone }: ConstructorParams<A>) {
    this._isNone = isNone;
    this.value = value;
    Object.freeze(this);
  }

  public static of<A>(a: A): Option<A> {
    if (a === null || a === undefined) {
      return Option.none();
    }
    return new Option({ value: a, isNone: false });
  }

  public static none() {
    return new Option<any>({ value: null, isNone: true });
  }

  public flatMap<B>(f: (a: A) => Option<B>): Option<B> {
    if (this._isNone) return Option.none();
    return f(this.value);
  }

  public map<B>(f: (a: A) => B): Option<B> {
    return this.flatMap(a => Option.of(f(a)));
  }

  public async flatMapAsync<B>(f: (a: A) => Promise<Option<B>>): Promise<Option<B>> {
    return f(this.value);
  }

  public async mapAsync<B>(f: (a: A) => Promise<B>): Promise<Option<B>> {
    if (this._isNone) return Option.none();
    const b = await f(this.value);
    return Option.of(b);
  }

  public getOrElse(cb: () => A): A {
    if (this._isNone) return cb();
    return this.value;
  }

  public getOrNull() {
    if (this._isNone) return null;
    return this.value;
  }

  public isNone() {
    return this._isNone;
  }
}

export const fromNullable = <A>(a: A): Option<NonNullable<A>> => {
  if (a === null || a === undefined) return Option.none();
  return Option.of<NonNullable<A>>(a!);
};
