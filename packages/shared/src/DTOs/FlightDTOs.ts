import * as Yup from "yup";
import { DateString, NumberOfMinutes, Flavor } from "../generalTypes/types";
import { WingId } from "./WingDTOs";
import { UserId } from "./UserDTOs";

export type FlightId = Flavor<string, "FlightId">;
export interface AddFlightDTO {
  id: FlightId;
  wingId: WingId;
  date: DateString;
  time?: string;
  site: string;
  duration: NumberOfMinutes;
}

export const addFlightSchema = Yup.object().shape<AddFlightDTO>({
  id: Yup.string().required(),
  wingId: Yup.string().required(),
  date: Yup.string().required(),
  time: Yup.string(),
  site: Yup.string().required(),
  duration: Yup.number().required(),
});

export interface FlightDTO extends AddFlightDTO {
  userId: UserId;
}
