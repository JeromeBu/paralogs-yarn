import { uuid, isUuid } from "../generalTypes/uuid";

export class WingId {
  public get value() {
    return this.id;
  }

  private constructor(private id: string) {}

  static create(id?: string): WingId {
    if (!id) return new WingId(uuid());
    if (!isUuid(id)) throw new Error("Given string is not uuid");
    return new WingId(id);
  }
}
