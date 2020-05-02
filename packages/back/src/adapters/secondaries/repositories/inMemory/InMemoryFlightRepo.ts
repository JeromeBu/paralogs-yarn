import { FlightUuid, UserUuid } from "@paralogs/shared";
import { FlightRepo } from "../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../domain/entities/FlightEntity";

export class InMemoryFlightRepo implements FlightRepo {
  private _flights: FlightEntity[] = [];

  public async findById(flightId: FlightUuid) {
    return this._flights.find(flight => flight.uuid === flightId);
  }

  public async findByUserId(userId: UserUuid) {
    return this._flights.filter(flight => flight.getProps().userUuid === userId);
  }

  public async save(flightEntity: FlightEntity) {
    if (flightEntity.hasIdentity()) {
      // eslint-disable-next-line no-console
      console.error("TODO handle update");
      return;
    }
    this._flights.push(flightEntity);
  }

  get flights() {
    return this._flights;
  }
}
