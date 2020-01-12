import { DateString, NumberOfMinutes } from "../generalTypes/types";

export interface WingDTO {
  id: string;
  userId: string;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}

export type CreateWingDTO = Omit<WingDTO, "userId">;
