import { DateString, NumberOfMinutes, Flavor } from "../generalTypes/types";
import { WingId } from "./WingDTOs";
import { UserId } from "./UserDTOs";

export type FlightId = Flavor<string, "FlightId">;

export interface FlightDTO {
  id: FlightId;
  wingId: WingId;
  userId: UserId;
  date: DateString;
  time: string;
  site: string;
  duration: NumberOfMinutes;
}

export type CreateFlightDTO = Omit<FlightDTO, "userId">;
