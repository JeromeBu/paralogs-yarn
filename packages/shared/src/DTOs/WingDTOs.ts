import * as Yup from "yup";
import { DateString, Flavor, NumberOfMinutes } from "../generalTypes/types";
import { UserId } from "./UserDTOs";

export type WingId = Flavor<string, "WingId">;

export interface AddWingDTO {
  id: WingId;
  brand: string;
  model: string;
  ownerFrom: DateString;
  ownerUntil?: DateString;
  flightTimePriorToOwn: NumberOfMinutes;
}

export const addWingSchema = Yup.object().shape<AddWingDTO>({
  id: Yup.string().required(),
  brand: Yup.string().required(),
  model: Yup.string().required(),
  ownerFrom: Yup.string().required(),
  ownerUntil: Yup.string(),
  flightTimePriorToOwn: Yup.number(),
});

export interface WingDTO extends AddWingDTO {
  userId: UserId;
}

export interface UpdateWingDTO extends Partial<AddWingDTO> {
  id: WingId;
}
