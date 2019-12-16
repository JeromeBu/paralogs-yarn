import { WingId } from "../valueObjects/WingId";
import { UserId } from "../valueObjects/UserId";
import { DateString, NumberOfMinutes } from "../generalTypes/types";

export interface Wing {
  id: WingId;
  userId: UserId;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}
