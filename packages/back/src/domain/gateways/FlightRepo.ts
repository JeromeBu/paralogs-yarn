import { FlightId, UserId } from "@paralogs/shared";
import { FlightEntity } from "../entities/FlightEntity";

export interface FlightRepo {
  findById: (id: FlightId) => Promise<FlightEntity | undefined>;
  findByUserId: (id: UserId) => Promise<FlightEntity[]>;
  create: (FlightEntity: FlightEntity) => Promise<void>;
}
