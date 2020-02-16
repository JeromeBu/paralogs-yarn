import { Observable } from "rxjs";
import { FlightDTO, AddFlightDTO } from "@paralogs/shared";

export interface FlightGateway {
  retrieveFlights(): Observable<FlightDTO[]>;
  addFlight(
    addFlightDto: AddFlightDTO,
  ): Observable<FlightDTO> /* QUESTION: return null, void or FlightDTO ? */;
}
