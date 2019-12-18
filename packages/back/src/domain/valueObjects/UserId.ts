import { uuid, isUuid } from "@paralogs/shared";
import { Result } from "../core/Result";

export class UserId {
  public get value() {
    return this.id;
  }

  private constructor(private id: string) {}

  static create(id?: string): Result<UserId> {
    if (!id) return Result.ok(new UserId(uuid()));
    if (id !== "offlineContext_cognitoIdentityId" && !isUuid(id))
      Result.fail("Given string is not uuid");
    return Result.ok(new UserId(id));
  }
}
