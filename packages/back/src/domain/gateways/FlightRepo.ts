import { FlightUuid, UserUuid } from "@paralogs/shared";
import { MaybeAsync } from "purify-ts";

import { FlightEntity } from "../entities/FlightEntity";
import { ResultAsync } from "../core/Result";

export interface FlightRepo {
  findByUuid: (id: FlightUuid) => MaybeAsync<FlightEntity>;
  findByUserUuid: (id: UserUuid) => Promise<FlightEntity[]>;
  save: (FlightEntity: FlightEntity) => ResultAsync<void>;
}
