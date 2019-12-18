import { FlightDTO } from "./FlightDTO";

export type CreateFlightDTO = Omit<FlightDTO, "userId">;
