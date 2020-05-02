import { FlightUuid, Result, UserUuid } from "@paralogs/shared";
import { FlightEntity } from "../entities/FlightEntity";

export interface FlightRepo {
  findByUuid: (id: FlightUuid) => Promise<FlightEntity | undefined>;
  findByUserUuid: (id: UserUuid) => Promise<FlightEntity[]>;
  save: (FlightEntity: FlightEntity) => Promise<Result<void>>;
}
