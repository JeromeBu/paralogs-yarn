import { FlightUuid, UserUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";
import { ResultAsync } from "@paralogs/back-shared";

import { FlightEntity } from "../entities/FlightEntity";

export interface FlightRepo {
  findByUuid: (id: FlightUuid) => MaybeAsync<FlightEntity>;
  findByUserUuid: (id: UserUuid) => Promise<FlightEntity[]>;
  save: (FlightEntity: FlightEntity) => ResultAsync<void>;
}
