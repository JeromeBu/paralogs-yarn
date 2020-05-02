import { FlightUuid, Result, UserUuid } from "@paralogs/shared";
import { FlightRepo } from "../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../domain/entities/FlightEntity";

export class InMemoryFlightRepo implements FlightRepo {
  private _flights: FlightEntity[] = [];

  public async findByUuid(flightUuid: FlightUuid) {
    return this._flights.find(flight => flight.uuid === flightUuid);
  }

  public async findByUserUuid(userUuid: UserUuid) {
    return this._flights.filter(flight => flight.getProps().userUuid === userUuid);
  }

  public async save(flightEntity: FlightEntity): Promise<Result<void>> {
    if (flightEntity.hasIdentity()) return Result.fail("TODO handle update");
    this._flights.push(flightEntity);
    return Result.ok();
  }

  get flights() {
    return this._flights;
  }
}
