import { trim } from "lodash/fp";
import { Result } from "@paralogs/shared";

const firstLetterUpperCase = (str: string) => {
  const [firstLetter, ...rest] = str.split("");
  return [firstLetter.toUpperCase(), ...rest].join("");
};

export class PersonName {
  public readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  static create(name?: string): Result<PersonName> {
    if (!name) return Result.ok(new PersonName(""));
    return Result.ok(new PersonName(firstLetterUpperCase(trim(name))));
  }
}
