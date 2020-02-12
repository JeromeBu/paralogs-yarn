import { BehaviorSubject, of } from "rxjs";

import { FlightDTO, CreateFlightDTO, uuid } from "@paralogs/shared";

import { FlightGateway } from "../useCases/flights/port/FlightGateway";

export class HttpFlightGateway implements FlightGateway {
  private _flights$ = new BehaviorSubject<FlightDTO[]>([]);

  retrieveFlights() {
    return this._flights$;
  }

  addFlight(createFlightDto: CreateFlightDTO) {
    const flightDto = { ...createFlightDto, userId: uuid() };
    return of(flightDto);
  }

  get flights$() {
    return this._flights$;
  }
}
