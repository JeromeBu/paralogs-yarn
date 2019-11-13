import { Wing } from "./Wing";
import { UUID, DateString, NumberOfMinutes } from "../..";

export interface Flight {
  id: UUID;
  date: DateString;
  time: string;
  site: string;
  wing: Wing;
  duration: NumberOfMinutes /* in minutes */;
}
