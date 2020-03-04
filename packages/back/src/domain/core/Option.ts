interface ConstructorParams<A> {
  value: A;
  isNone: boolean;
}

export class Option<A> {
  private value: A;
  private isNone: boolean;

  private constructor({ value, isNone }: ConstructorParams<A>) {
    this.isNone = isNone;
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
    return f(this.value);
  }

  public map<B>(f: (a: A) => B): Option<B> {
    return this.flatMap(a => Option.of(f(a)));
  }

  public async flatMapAsync<B>(f: (a: A) => Promise<Option<B>>): Promise<Option<B>> {
    return f(this.value);
  }

  public async mapAsync<B>(f: (a: A) => Promise<B>): Promise<Option<B>> {
    if (this.isNone) return Option.none();

    const b = await f(this.value);
    return Option.of(b);
  }

  public getOrElse(cb: () => A): A {
    if (this.isNone) return cb();
    return this.value;
  }

  public getOrNull() {
    if (this.isNone) return null;
    return this.value;
  }
}

export const fromNullable = <A>(a: A): Option<NonNullable<A>> => {
  if (a === null || a === undefined) return Option.none();
  return Option.of<NonNullable<A>>(a!);
};
