import * as Yup from "yup";
import { DateString, NumberOfMinutes } from "../generalTypes/types";

export interface CreateWingDTO {
  id: string;
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
  userId: string;
}
