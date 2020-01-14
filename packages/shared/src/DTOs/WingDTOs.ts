import { DateString, NumberOfMinutes } from "../generalTypes/types";

export interface CreateWingDTO {
  id: string;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}
export interface WingDTO extends CreateWingDTO {
  userId: string;
}
