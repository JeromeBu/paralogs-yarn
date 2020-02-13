import { FlightId } from "@paralogs/shared";
import { FlightEntity } from "../entities/FlightEntity";

export interface FlightRepo {
  findById: (id: FlightId) => Promise<FlightEntity | undefined>;
  save: (FlightEntity: FlightEntity) => Promise<void>;
}
