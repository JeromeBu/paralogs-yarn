import { DateString, NumberOfMinutes } from "./generalTypes/types";
import { UserId } from "./DTOs";

export interface FlightDTO {
  id: string;
  wingId: string;
  userId: UserId;
  date: DateString;
  time: string;
  site: string;
  duration: NumberOfMinutes /* in minutes */;
}
