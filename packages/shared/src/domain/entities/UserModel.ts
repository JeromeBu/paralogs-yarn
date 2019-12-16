import { isUuid, uuid } from "../../generalTypes/uuid";

export class UserId {
  public get value() {
    return this.id;
  }

  private constructor(private id: string) {}

  static create(id?: string): UserId {
    if (!id) return new UserId(uuid());
    if (id !== "offlineContext_cognitoIdentityId" && !isUuid(id))
      throw new Error("Given string is not uuid");
    return new UserId(id);
  }
}
