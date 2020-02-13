import { FlightId } from "@paralogs/shared";
import { FlightRepo } from "../../../../domain/port/FlightRepo";
import { FlightEntity } from "../../../../domain/entities/FlightEntity";

export class InMemoryFlightRepo implements FlightRepo {
  private _flights: FlightEntity[] = [];

  public async findById(flightId: FlightId) {
    return this._flights.find(flight => flight.id === flightId);
  }

  public async save(flightEntity: FlightEntity) {
    this._flights.push(flightEntity);
  }

  get flights() {
    return this._flights;
  }
}
