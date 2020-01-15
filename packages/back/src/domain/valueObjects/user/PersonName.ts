import { compose, capitalize, trim } from "lodash/fp";
import { Result } from "../../core/Result";

export class PersonName {
  private constructor(public readonly value: string) {
    this.value = value;
  }

  static create(name?: string): Result<PersonName> {
    if (!name) return Result.ok(new PersonName(""));
    return Result.ok(new PersonName(compose(capitalize, trim)(name)));
  }
}
