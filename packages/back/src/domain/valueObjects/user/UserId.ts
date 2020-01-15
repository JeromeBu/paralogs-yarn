import { uuid } from "@paralogs/shared";
import { Result } from "../../core/Result";

export class UserId {
  public get value() {
    return this.id;
  }

  private constructor(private id: string) {}

  static create(id?: string): Result<UserId> {
    if (!id) return Result.ok(new UserId(uuid()));
    return Result.ok(new UserId(id));
  }
}
