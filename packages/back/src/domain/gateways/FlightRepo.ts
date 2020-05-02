import { FlightUuid, UserUuid } from "@paralogs/shared";
import { FlightEntity } from "../entities/FlightEntity";

export interface FlightRepo {
  findById: (id: FlightUuid) => Promise<FlightEntity | undefined>;
  findByUserId: (id: UserUuid) => Promise<FlightEntity[]>;
  save: (FlightEntity: FlightEntity) => Promise<void>;
}
