import { Observable } from "rxjs";
import { FlightDTO, CreateFlightDTO } from "@paralogs/shared";

export interface FlightGateway {
  retrieveFlights(): Observable<FlightDTO[]>;
  addFlight(
    flight: CreateFlightDTO,
  ): Observable<FlightDTO> /* QUESTION: return null, void or FlightDTO ? */;
}
