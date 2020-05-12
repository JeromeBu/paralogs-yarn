import * as Yup from "yup";
import { Flavor } from "..";

export type PilotUuid = Flavor<string, "PilotUuid">;

export interface WithPilotUuid {
  pilotUuid: PilotUuid;
}

export interface PilotDTO {
  uuid: PilotUuid;
  firstName: string;
  lastName?: string;
}

export type UpdatePilotDTO = Partial<PilotDTO>;

export const pilotSchema = Yup.object().shape<UpdatePilotDTO>({
  uuid: Yup.string().required(),
  firstName: Yup.string(),
  lastName: Yup.string(),
});
