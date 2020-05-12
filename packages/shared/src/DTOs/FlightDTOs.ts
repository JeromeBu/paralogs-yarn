import * as Yup from "yup";
import { DateString, NumberOfMinutes, Flavor } from "../generalTypes/types";
import { WingUuid } from "./WingDTOs";
import { WithPilotUuid } from "./PilotDTOs";

export type FlightUuid = Flavor<string, "FlightUuid">;

export interface AddFlightDTO {
  uuid: FlightUuid;
  wingUuid: WingUuid;
  date: DateString;
  time?: string;
  site: string;
  duration: NumberOfMinutes;
}

export const addFlightSchema = Yup.object().shape<AddFlightDTO>({
  uuid: Yup.string().required(),
  wingUuid: Yup.string().required(),
  date: Yup.string().required(),
  time: Yup.string(),
  site: Yup.string().required(),
  duration: Yup.number().required(),
});

export type FlightDTO = AddFlightDTO & WithPilotUuid;
