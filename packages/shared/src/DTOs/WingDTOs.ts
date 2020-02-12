import * as Yup from "yup";
import { DateString, NumberOfMinutes, Flavor } from "../generalTypes/types";
import { UserId } from "./UserDTOs";

export type WingId = Flavor<string, "WingId">;

export interface CreateWingDTO {
  id: WingId;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}

export const createWingSchema = Yup.object().shape<CreateWingDTO>({
  id: Yup.string().required(),
  brand: Yup.string().required(),
  model: Yup.string().required(),
  ownerFrom: Yup.string().required(),
  ownerUntil: Yup.string(),
  flightTimePriorToOwn: Yup.number(),
});

export interface WingDTO extends CreateWingDTO {
  userId: UserId;
}
