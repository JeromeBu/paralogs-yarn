// eslint-disable-next-line max-classes-per-file
import { DateString, NumberOfMinutes } from "../..";
import { isUuid, uuid } from "../../generalTypes/uuid";
import { UserId } from "./UserModel";

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

export interface Wing {
  id: WingId;
  userId: UserId;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}
