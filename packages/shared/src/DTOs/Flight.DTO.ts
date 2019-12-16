import { FlightId, WingId, UserId } from "../valueObjects";
import { DateString, NumberOfMinutes } from "../generalTypes/types";

export interface Flight {
  id: FlightId;
  wingId: WingId;
  userId: UserId;
  date: DateString;
  time: string;
  site: string;
  duration: NumberOfMinutes /* in minutes */;
}
