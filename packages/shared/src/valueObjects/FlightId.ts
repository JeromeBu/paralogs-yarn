import { uuid, isUuid } from "../generalTypes/uuid";

export class FlightId {
  public get value() {
    return this.id;
  }

  private constructor(private id: string) {}

  static create(id?: string): FlightId {
    if (!id) return new FlightId(uuid());
    if (!isUuid(id)) throw new Error("Given string is not uuid");
    return new FlightId(id);
  }
}
