import { DateString, NumberOfMinutes } from "./generalTypes/types";

export interface FlightDTO {
  id: string;
  wingId: string;
  userId: string;
  date: DateString;
  time: string;
  site: string;
  duration: NumberOfMinutes /* in minutes */;
}
