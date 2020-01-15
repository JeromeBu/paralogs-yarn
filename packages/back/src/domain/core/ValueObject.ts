export abstract class ValueObject<T> {
  private constructor(public readonly value: T) {}

  public create(params: T) {
    return new ValueObject(params);
  }
}
