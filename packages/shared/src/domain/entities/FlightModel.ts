import { WingId } from "./WingModel";
import { DateString, NumberOfMinutes } from "../..";
import { uuid, isUuid } from "../../generalTypes/uuid";
import { UserId } from "./UserModel";

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

export interface Flight {
  id: FlightId;
  wingId: WingId;
  userId: UserId;
  date: DateString;
  time: string;
  site: string;
  duration: NumberOfMinutes /* in minutes */;
}
