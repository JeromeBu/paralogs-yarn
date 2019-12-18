import { isUuid, uuid } from "@paralogs/shared";
import { Result } from "../core/Result";

export class WingId {
  public get value() {
    return this.id;
  }

  private constructor(private id: string) {}

  static create(id?: string): Result<WingId> {
    if (!id) return Result.ok(new WingId(uuid()));
    if (!isUuid(id)) return Result.fail("Given string is not uuid");
    return Result.ok(new WingId(id));
  }
}
