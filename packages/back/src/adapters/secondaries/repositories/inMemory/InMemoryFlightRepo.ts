import { List } from "purify-ts";
import { liftMaybe } from "purify-ts/MaybeAsync";
import { FlightUuid, UserUuid } from "@paralogs/shared";
import {
  LeftAsync,
  ResultAsync,
  RightAsyncVoid,
  validationError,
} from "@paralogs/back-shared";

import { FlightRepo } from "../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../domain/entities/FlightEntity";

export class InMemoryFlightRepo implements FlightRepo {
  private _flights: FlightEntity[] = [];

  public findByUuid(flightUuid: FlightUuid) {
    return liftMaybe(List.find(flight => flight.uuid === flightUuid, this._flights));
  }

  public async findByUserUuid(userUuid: UserUuid) {
    return this._flights.filter(flight => flight.getProps().userUuid === userUuid);
  }

  public save(flightEntity: FlightEntity): ResultAsync<void> {
    if (flightEntity.hasIdentity())
      return LeftAsync(validationError("TODO handle update"));
    this._flights.push(flightEntity);
    return RightAsyncVoid();
  }

  get flights() {
    return this._flights;
  }
}
