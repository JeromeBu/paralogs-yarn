import { BehaviorSubject, of } from "rxjs";

import { FlightDTO, AddFlightDTO, uuid } from "@paralogs/shared";

import { FlightGateway } from "../useCases/flights/gateways/FlightGateway";

export class InMemoryFlightGateway implements FlightGateway {
  private _flights$ = new BehaviorSubject<FlightDTO[]>([]);

  retrieveFlights() {
    return this._flights$;
  }

  addFlight(addFlightDto: AddFlightDTO) {
    const flightDto: FlightDTO = { ...addFlightDto, userId: uuid() };
    return of(flightDto);
  }

  get flights$() {
    return this._flights$;
  }
}
