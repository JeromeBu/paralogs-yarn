import { compose, capitalize, trim } from "lodash/fp";
import { Result } from "../../core/Result";

export class PersonName {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(name?: string): Result<PersonName> {
    if (!name) return Result.ok(new PersonName(""));
    return Result.ok(new PersonName(compose(capitalize, trim)(name)));
  }
}
