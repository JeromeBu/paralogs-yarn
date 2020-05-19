import { Flavor } from "../generalTypes/types";

export type PilotUuid = Flavor<string, "PilotUuid">;

export interface WithPilotUuid {
  pilotUuid: PilotUuid;
}

export interface PilotDTO {
  uuid: PilotUuid;
  firstName: string;
  lastName?: string;
}
