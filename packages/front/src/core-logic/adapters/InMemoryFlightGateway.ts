import { BehaviorSubject, of } from "rxjs";

import { Flight } from "@paralogs/shared";

import { FlightGateway } from "../useCases/flights/port/FlightGateway";

export class InMemoryFlightGateway implements FlightGateway {
  private _flights$ = new BehaviorSubject<Flight[]>([]);

  retrieveFlights() {
    return this._flights$;
  }

  addFlight(flight: Flight) {
    return of(flight);
  }

  get flights$() {
    return this._flights$;
  }
}
