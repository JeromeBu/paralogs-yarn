import { DateString, NumberOfMinutes, UUID } from "../..";

export interface Wing {
  id: UUID;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}
