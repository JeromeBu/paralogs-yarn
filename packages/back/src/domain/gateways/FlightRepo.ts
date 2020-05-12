import { FlightUuid, PilotUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";
import { ResultAsync } from "@paralogs/back-shared";

import { FlightEntity } from "../entities/FlightEntity";

export interface FlightRepo {
  findByUuid: (id: FlightUuid) => MaybeAsync<FlightEntity>;
  findByPilotUuid: (pilotUuid: PilotUuid) => Promise<FlightEntity[]>;
  save: (FlightEntity: FlightEntity) => ResultAsync<void>;
}
