import { Observable } from "rxjs";
import { Flight } from "@paralogs/shared";

export interface FlightGateway {
  retrieveFlights(): Observable<Flight[]>;
  addFlight(
    flight: Flight,
  ): Observable<Flight> /* QUESTION: return null, void or Flight ? */;
}
