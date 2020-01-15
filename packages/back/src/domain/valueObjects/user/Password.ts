import { Result } from "../../core/Result";

export class Password {
  private constructor(public readonly value: string) {
    this.value = value;
  }

  static create(password: string): Result<Password> {
    if (password.length < 8)
      return Result.fail("Password must be at least 8 characters long");
    if (password.toLowerCase() === password)
      return Result.fail("Password must have upper case characters");
    if (password.toUpperCase() === password)
      return Result.fail("Password must have lower case characters");

    return Result.ok(new Password(password));
  }
}
