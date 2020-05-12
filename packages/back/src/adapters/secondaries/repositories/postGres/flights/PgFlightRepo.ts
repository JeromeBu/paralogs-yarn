import Knex from "knex";
import { FlightUuid, PilotUuid, WingUuid } from "@paralogs/shared";
import { Maybe } from "purify-ts";
import { liftPromise as liftPromiseToEitherAsync } from "purify-ts/EitherAsync";
import { liftMaybe, liftPromise as liftPromiseToMaybeAsync } from "purify-ts/MaybeAsync";
import {
  LeftAsync,
  ResultAsync,
  RightAsyncVoid,
  notFoundError,
  validationError,
} from "@paralogs/back-shared";

import { flightPersistenceMapper } from "./flightPersistenceMapper";
import { FlightRepo } from "../../../../../domain/gateways/FlightRepo";
import { FlightEntity } from "../../../../../domain/entities/FlightEntity";
import { FlightPersistence } from "./FlightPersistence";
import { PilotPersistence } from "../pilots/PilotPersistence";
import { WingPersistence } from "../wings/WingPersistence";

export class PgFlightRepo implements FlightRepo {
  constructor(private knex: Knex<any, unknown[]>) {}

  public save(flightEntity: FlightEntity): ResultAsync<void> {
    if (flightEntity.hasIdentity())
      return LeftAsync(validationError("TODO handle update"));

    this._getPilotId(flightEntity.pilotUuid);

    const eitherParams = this._getPilotId(flightEntity.pilotUuid).chain(pilot_id =>
      this._getWingId(flightEntity.wingUuid).map(wing_id => ({ wing_id, pilot_id })),
    );

    return eitherParams
      .chain(({ pilot_id, wing_id }) =>
        liftPromiseToEitherAsync(() =>
          this.knex<FlightPersistence>("flights").insert({
            ...flightPersistenceMapper.toPersistence(flightEntity),
            pilot_id,
            wing_id,
            id: undefined,
          }),
        ),
      )
      .chain(RightAsyncVoid);
  }

  public async findByPilotUuid(pilot_uuid: PilotUuid) {
    return (await this.knex.from<FlightPersistence>("flights").where({ pilot_uuid })).map(
      flightPersistenceMapper.toEntity,
    );
  }

  public findByUuid(uuid: FlightUuid) {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<FlightPersistence>("flights")
        .where({ uuid })
        .first(),
    )
      .chain(flightPersistence => liftMaybe(Maybe.fromNullable(flightPersistence)))
      .map(flightPersistenceMapper.toEntity);
  }

  private _getPilotId(uuid: PilotUuid): ResultAsync<number> {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<PilotPersistence>("pilots")
        .select("id")
        .where({ uuid })
        .first(),
    )
      .chain(pilotPersistence => liftMaybe(Maybe.fromNullable(pilotPersistence)))
      .map(({ id }) => id)
      .toEitherAsync(notFoundError("No pilot matched this pilotUuid"));
  }

  private _getWingId(uuid: WingUuid): ResultAsync<number> {
    return liftPromiseToMaybeAsync(() =>
      this.knex
        .from<WingPersistence>("wings")
        .select("id")
        .where({ uuid })
        .first(),
    )
      .chain(wingPersistence => liftMaybe(Maybe.fromNullable(wingPersistence)))
      .map(({ id }) => id)
      .toEitherAsync(notFoundError("No wing matched this wingUuid"));
  }
}
